import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname: path } = useLocation();
  useEffect(() => {
    console.log(path);
  });
  return (
    <div className=" flex flex-col top-0 left-0 w-1/6 bg-[#022213] h-screen border-">
      <div className="flex items-center justify-center h-14 text-[#517003] p-20 pb-40 font-bold text-[40px]">
        <div>Lakshmi</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className=" p-6">
            <Link
              to="/"
              className={`trans p-10 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent hover:border-[#626F47] ${
                path === "/"
                  ? "bg-[#517003] text-gray-50 hover:bg-[#517003] hover:text-white"
                  : "hover:bg-gray-50 text-gray-400 hover:text-gray-800"
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" w-9 h-9"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.25 18a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0z"
                  />
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 1.25c-.708 0-1.351.203-2.05.542c-.674.328-1.454.812-2.427 1.416L5.456 4.491c-.92.572-1.659 1.03-2.227 1.465c-.589.45-1.041.91-1.368 1.507c-.326.595-.472 1.229-.543 1.978c-.068.725-.068 1.613-.068 2.726v1.613c0 1.904 0 3.407.153 4.582c.156 1.205.486 2.178 1.23 2.947c.747.773 1.697 1.119 2.875 1.282c1.14.159 2.598.159 4.434.159h4.116c1.836 0 3.294 0 4.434-.159c1.177-.163 2.128-.509 2.876-1.282c.743-.769 1.073-1.742 1.23-2.947c.152-1.175.152-2.678.152-4.582v-1.613c0-1.113 0-2-.068-2.726c-.07-.75-.217-1.383-.543-1.978c-.327-.597-.78-1.056-1.368-1.507c-.568-.436-1.306-.893-2.227-1.465l-2.067-1.283c-.973-.604-1.753-1.088-2.428-1.416c-.697-.34-1.34-.542-2.049-.542M8.28 4.504c1.015-.63 1.73-1.072 2.327-1.363c.581-.283.993-.391 1.393-.391s.812.108 1.393.391c.598.29 1.312.733 2.327 1.363l2 1.241c.961.597 1.636 1.016 2.14 1.402c.489.375.77.684.963 1.036c.193.353.306.766.365 1.398c.061.648.062 1.465.062 2.623v1.521c0 1.97-.002 3.376-.14 4.443c-.136 1.048-.393 1.656-.82 2.099c-.425.439-1.003.7-2.004.839c-1.026.142-2.379.144-4.286.144h-4c-1.908 0-3.26-.002-4.286-.144c-1.001-.14-1.579-.4-2.003-.84c-.428-.442-.685-1.05-.82-2.098c-.14-1.067-.141-2.472-.141-4.443v-1.521c0-1.158 0-1.975.062-2.623c.059-.632.172-1.045.365-1.398c.193-.352.474-.661.964-1.036c.503-.386 1.178-.805 2.139-1.402z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span className="ml-10 text-2xl tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li className=" p-6">
            <Link
              to="/predictions"
              className={`trans p-10 rounded-2xl relative flex flex-row items-center h-11 focus:outline-noneborder-l-4 border-transparent hover:border-[#626F47] ${
                path.includes("predictions")
                  ? "bg-[#517003] text-gray-50 hover:bg-[#517003] hover:text-white"
                  : " hover:bg-gray-50 text-gray-400 hover:text-gray-800 "
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M6.13 2.793A3.9 3.9 0 0 1 8.5 2a1.76 1.76 0 0 1 1.5.78A1.76 1.76 0 0 1 11.5 2a3.9 3.9 0 0 1 2.37.793c.525.408.93.973 1.073 1.656c.328.025.628.161.88.366c.382.31.66.775.835 1.267c.274.765.348 1.74.064 2.57q.108.051.212.12c.275.183.484.445.638.754c.303.605.428 1.449.428 2.474c0 1.141-.435 1.907-.987 2.38a2.7 2.7 0 0 1-1.054.555c-.1.558-.38 1.204-.819 1.752c-.57.715-1.454 1.313-2.64 1.313c-.94 0-1.688-.52-2.174-1.03a4 4 0 0 1-.326-.385a4 4 0 0 1-.326.385C9.188 17.48 8.441 18 7.5 18c-1.186 0-2.069-.598-2.64-1.313a4.06 4.06 0 0 1-.819-1.752a2.7 2.7 0 0 1-1.054-.555C2.435 13.907 2 13.14 2 12c0-1.025.126-1.87.428-2.474a1.9 1.9 0 0 1 .638-.755a2 2 0 0 1 .212-.118c-.284-.832-.21-1.806.064-2.571c.175-.492.453-.957.835-1.267c.252-.205.552-.34.88-.366c.144-.683.549-1.248 1.074-1.656M9.5 4.5v-.01l-.002-.05a2.7 2.7 0 0 0-.154-.764a1.2 1.2 0 0 0-.309-.49A.76.76 0 0 0 8.5 3a2.9 2.9 0 0 0-1.756.582C6.28 3.943 6 4.432 6 5a.5.5 0 0 1-.658.474c-.188-.062-.356-.027-.535.117c-.196.16-.387.444-.524.827c-.279.782-.25 1.729.133 2.305A.5.5 0 0 1 4.5 9h.75a2.25 2.25 0 0 1 2.25 2.25v.335a1.5 1.5 0 1 1-1 0v-.335c0-.69-.56-1.25-1.25-1.25H3.5a.5.5 0 0 1-.175-.032l-.003.006C3.124 10.369 3 11.025 3 12c0 .859.315 1.343.638 1.62c.347.298.732.38.862.38a.5.5 0 0 1 .5.5c0 .368.2 1.011.64 1.563c.429.535 1.046.937 1.86.937c.56 0 1.062-.313 1.45-.72c.191-.2.34-.407.437-.577a1.6 1.6 0 0 0 .113-.236V7.5H8.415a1.5 1.5 0 1 1 0-1H9.5zm1 9.999v.967l.012.033q.028.075.1.203c.099.17.247.377.437.577c.389.407.892.72 1.451.72c.814 0 1.431-.402 1.86-.937c.44-.552.64-1.195.64-1.563a.5.5 0 0 1 .5-.5c.13 0 .515-.082.862-.38c.323-.277.638-.761.638-1.62c0-.975-.125-1.63-.322-2.026a.9.9 0 0 0-.3-.37A.66.66 0 0 0 16 9.5a.5.5 0 0 1-.416-.777c.384-.576.412-1.523.133-2.305c-.137-.383-.328-.668-.524-.827c-.179-.144-.347-.18-.535-.117A.5.5 0 0 1 14 5c0-.568-.28-1.057-.745-1.418A2.9 2.9 0 0 0 11.5 3a.76.76 0 0 0-.535.186a1.2 1.2 0 0 0-.31.49a2.6 2.6 0 0 0-.155.814v9.01h.75c.69 0 1.25-.56 1.25-1.25v-1.835a1.5 1.5 0 1 1 1 0v1.835a2.25 2.25 0 0 1-2.25 2.25zM6.5 7a.5.5 0 1 0 1 0a.5.5 0 0 0-1 0M13 9.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m-6 3a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1"
                  />
                </svg>
              </span>
              <span className="ml-10 text-2xl tracking-wide truncate">
                predictions
              </span>
            </Link>
          </li>
          <li className=" p-6">
            <Link
              to="/schedules"
              className={`trans p-10 rounded-2xl relative flex flex-row items-center h-11 focus:outline-noneborder-l-4 border-transparent hover:border-[#626F47] ${
                path.includes("schedules")
                  ? "bg-[#517003] text-gray-50 hover:bg-[#517003] hover:text-white"
                  : " hover:bg-gray-50 text-gray-400 hover:text-gray-800 "
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1m-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1M7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1"
                  />
                </svg>
              </span>
              <span className="ml-10 text-2xl tracking-wide truncate">
                Schedules
              </span>
            </Link>
          </li>
          <li className=" p-6">
            <Link
              to="/routes"
              className={`trans p-10 rounded-2xl relative flex flex-row items-center h-11 focus:outline-noneborder-l-4 border-transparent hover:border-[#626F47] ${
                path.includes("routes")
                  ? "bg-[#517003] text-gray-50 hover:bg-[#517003] hover:text-white"
                  : " hover:bg-gray-50 text-gray-400 hover:text-gray-800 "
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m5.253 4.196l-1.227.712c-.989.573-1.483.86-1.754 1.337C2 6.722 2 7.302 2 8.464v8.164c0 1.526 0 2.29.342 2.714c.228.282.547.472.9.535c.53.095 1.18-.282 2.478-1.035c.882-.511 1.73-1.043 2.785-.898c.48.065.937.293 1.853.748l3.813 1.896c.825.41.833.412 1.75.412H18c1.886 0 2.828 0 3.414-.599c.586-.598.586-1.562.586-3.49v-6.74c0-1.927 0-2.89-.586-3.49c-.586-.598-1.528-.598-3.414-.598h-2.079c-.917 0-.925-.002-1.75-.412L10.84 4.015C9.449 3.323 8.753 2.977 8.012 3S6.6 3.415 5.253 4.196M8 3v14.5m7-11v14"
                    color="currentColor"
                  />
                </svg>
              </span>
              <span className="ml-10 text-2xl tracking-wide truncate">
                Routes
              </span>
            </Link>
          </li>
          <li className=" p-6">
            <Link
              to="/announcements"
              className={`trans p-10 rounded-2xl relative flex flex-row items-center h-11 focus:outline-noneborder-l-4 border-transparent hover:border-[#626F47] ${
                path.includes("announcements")
                  ? "bg-[#517003] text-gray-50 hover:bg-[#517003] hover:text-white"
                  : " hover:bg-gray-50 text-gray-400 hover:text-gray-800 "
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h3l5 4V4zm3 7.6L13 14H4v-4h9l2-1.6zm6.5-3.6c0 1.71-.96 3.26-2.5 4V8c1.53.75 2.5 2.3 2.5 4"
                  />
                </svg>
              </span>
              <span className="ml-10 text-2xl tracking-wide truncate">
                Announcements
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
