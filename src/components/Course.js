import { hasConflict, getCourseTerm } from '../utilities/times.js';

const getCourseNumber = course => (
    //course.id.slice(1, 4)
    course.number
  );

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style={
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return (  
      <div className="card m-1 p-2"
        style={style}
        onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
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