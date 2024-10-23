import { courseCategories } from "@/config";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { FcIdea } from "react-icons/fc";
import { FcLineChart } from "react-icons/fc";
import { FcGraduationCap } from "react-icons/fc";
import { FcOnlineSupport } from "react-icons/fc";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    } else {
      console.log("error");
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="flex flex-col lg:flex-col items-center justify-between py-8 px-4 lg:px-8">
        <div className=" py-32   lg:w-1/2 lg:pr-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>
        <div className="max-w-screen-lg  mb-8 lg:mb-0">
          <video
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
            className="w-full h-auto rounded-2xl shadow-black shadow-2xl"
            loop
            preload="auto"
            autoPlay
            muted
          />
        </div>
      </section>

      {/* middle section */}

      <section className="bg-gray-100 p-8 lg:p-24 ">
        <div className="py-16">
          <h1 className="text-4xl pb-4">
            Get the skills you need for a job that is in demand.
          </h1>
          <p className="font-light  ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            veniam laudantium dolor
          </p>
        </div>
        <div className="flex flex-col-reverse  md:flex-row items-center   justify-around">
          <ol className="max-w-[50%] relative border-s border-gray-300 dark:border-gray-700">
            <li className="mb-10 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <FcIdea className="text-2xl  " />
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Leadership{" "}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on January 13th, 2022
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus, exercitationem quo! Repellendus
              </p>
            </li>
            <li className="mb-10 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <FcGraduationCap className="text-2xl  " />
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Lorem ipsum
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on December 7th, 2021
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates unde cumque harum
              </p>
            </li>
            <li className="mb-10 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <FcOnlineSupport className="text-2xl  " />
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Lorem, ipsum.
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on December 2nd, 2021
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates unde cumque
              </p>
            </li>
            <li className=" ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <FcLineChart className="text-2xl  " />
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Lorem, ipsum.
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on December 2nd, 2021
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates unde cumque
              </p>
            </li>
          </ol>

          <div>
            <img
              className="w-full"
              src="https://picsum.photos/536/354"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Category section */}
      <section className="py-8 px-4 lg:px-24">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-around"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Course display section */}
      <section className="py-12 px-4 lg:px-24">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <Card
                key={courseItem}
                className="max-w-xs hover:scale-105 transition "
                imgAlt="Course image"
                imgSrc={courseItem?.image}
              >
                <div className="">
                  <h5 className="text-xl font-semibold tracking-tight pb-2 text-gray-900 dark:text-white">
                    {courseItem?.title.charAt(0).toUpperCase() +
                      courseItem?.title.slice(1)}
                  </h5>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-light">
                      <span className="">created By </span>
                      {courseItem?.instructorName.charAt(0).toUpperCase() +
                        courseItem?.instructorName.slice(1)}
                    </p>
                    <p className="text-xs  bg-gray-200 p-1 rounded-sm ">
                      {courseItem?.category.charAt(0).toUpperCase() +
                        courseItem?.category.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold  text-gray-900 dark:text-white">
                    ₹ {courseItem?.pricing}
                  </span>
                  <p
                    onClick={() => handleCourseNavigate(courseItem?._id)}
                    className=" cursor-pointer rounded-lg bg-black px-2 py-2.5 text-center text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-cyan-800"
                  >
                    View Details
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
