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
        <div className="max-w-screen-lg mb-8 lg:mb-0">
          <video
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
            className="w-full h-auto rounded-lg shadow-lg"
            loop
            preload="auto"
            autoPlay
            muted
          />
        </div>
      </section>
      <section></section>
      <section className="py-8 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
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
                    <p className="text-sm font-light">
                      <span className="">created By </span>
                      {courseItem?.instructorName.charAt(0).toUpperCase() +
                        courseItem?.instructorName.slice(1)}
                    </p>
                    <p className="text-xs bg-gray-200 p-1 rounded-sm ">
                      {courseItem?.category.charAt(0).toUpperCase() +
                        courseItem?.category.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold  text-gray-900 dark:text-white">
                    ₹{courseItem?.pricing}
                  </span>
                  <a
                    onClick={() => handleCourseNavigate(courseItem?._id)}
                    href={""}
                    className="rounded-lg bg-black px-2 py-2.5 text-center text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-cyan-800"
                  >
                    View Details
                  </a>
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
