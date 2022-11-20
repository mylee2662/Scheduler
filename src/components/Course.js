import { hasConflict, getCourseTerm, timeParts } from '../utilities/times.js';
import { setData, useUserState } from '../utilities/firebase.js';

const getCourseNumber = course => (
    //course.id.slice(1, 4)
    course.number
  );

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const getCourseMeetingData = course => {
  const meets = prompt('Enter meeting data: MTuWThF hh:mm-hh:mm:', course.meets);
  const valid = !meets || timeParts(meets).days;
  if(valid) return meets;
  alert('Invalid meeting data');
  return null;
};

const reschedule = async (course, meets) => {
  if (meets && window.confirm(`Change ${course.id} to ${meets}`)){
    try{
      await setData(`/courses/${course.id}/meets`, meets);
    } catch (error){
      alert(error);
    }
  }
};

const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const [user] = useUserState();
    const style={
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return (  
      <div className="card m-1 p-2"
        style={style}
        onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
        onDoubleClick={!user ? null : () => reschedule(course, getCourseMeetingData(course))}>
        <div className="card-body">
          <div className="card-title">
            <p class="fw-bold">{ getCourseTerm(course) } CS { getCourseNumber(course) }</p>
          </div>
          <div className="card-text">{ course.title }</div>
          <hr/>
          <div className="card-text mt-auto">{ course.meets }</div>
        </div>
      </div>
    );
  };

export default Course;