import React, { useState } from "react";
import Header from "../components/Header";
import CourseFilter from "../components/CourseFilter";
import PostList from "../components/PostList";

const HomePage = () => {
  const [course, setCourse] = useState("Todos");

  return (
    <div>
      <Header />
      <CourseFilter selected={course} onSelect={setCourse} />
      <PostList course={course} />
    </div>
  );
};

export default HomePage;
