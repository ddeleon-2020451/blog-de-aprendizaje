import React from "react";

const courses = ["Todos", "Taller", "Tecnología", "Práctica Supervisada"];

const CourseFilter = ({ selected, onSelect }) => (
  <div className="course-filter">
    {courses.map((course) => (
      <button
        key={course}
        className={selected === course ? "active" : ""}
        onClick={() => onSelect(course)}
      >
        {course}
      </button>
    ))}
  </div>
);

export default CourseFilter;
