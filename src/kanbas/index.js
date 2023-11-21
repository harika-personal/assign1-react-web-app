import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { React, useState, useEffect } from "react";
// import db from "./Databases";
import store from "./Store";
import { Provider } from "react-redux";
import axios from "axios";

function Kanbas() {
  
  const [courses, setCourses] = useState([]);
  // const URL = "http://localhost:4000/api/courses";
  const URL = "https://kanbas-node-server-app-5eyi.onrender.com/api/courses";
  const findAllCourses = async () => {
    const response = await axios.get(URL);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);


   const [course, setCourse] = useState({
     name: "New Course",      number: "New Number",
     startDate: "2023-09-10", endDate: "2023-12-15",
   });
  //  const addNewCourse = () => {
  //    setCourses([...courses,
  //              { ...course,
  //                _id: new Date().getTime() }]);
  //  };

   const addNewCourse = async () => {
    const response = await axios.post(URL, course);
    setCourses([
      response.data,
      ...courses,
    ]);
    // setCourse({ name: "" });
  };

  const deleteCourse = async (course) => {
    const response = await axios.delete(
      `${URL}/${course._id}`
    );
    setCourses(courses.filter(
      (c) => c._id !== course._id));
  };

  const updateCourse = async (course) => {
    const response = await axios.put(
      `${URL}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          // return response.data;
          return course;
        }
        return c;
      })
    );
    // setCourse({ name: "xxx" });
  };





  //  const deleteCourse = (courseId) => {
  //    setCourses(courses.filter((course) => course._id !== courseId));
  //  };
 
    // const updateCourse = () => {
    //   setCourses(
    //     courses.map((c) => {
    //       if (c._id === course._id) {
    //         return course;
    //       } else {
    //         return c;
    //       }
    //     })
    //   );
    // };

    return(
      <Provider store={store}>

      <div className="d-flex">
         <KanbasNavigation />        
         <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route path="Dashboard" element={
               <Dashboard 
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
               />
            } />
            {/* <Route path="Courses/*" element={<h1>Courses</h1>} /> */}
            <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />    

         </Routes>   
      </div>
      </Provider>

         

    );
 }
export default Kanbas;