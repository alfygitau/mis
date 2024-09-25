import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="h-[60px] text-white w-full shadow-b-lg flex items-center justify-between">
      <div className="flex items-center gap-[20px]">
        <NavLink
          end
          to="/dashboard"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.995 4.68v3.88A2.44 2.44 0 0 1 8.545 11h-3.86a2.38 2.38 0 0 1-1.72-.72a2.4 2.4 0 0 1-.71-1.72V4.69a2.44 2.44 0 0 1 2.43-2.44h3.87a2.42 2.42 0 0 1 1.72.72a2.4 2.4 0 0 1 .72 1.71m10.75.01v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.73-.71a2.44 2.44 0 0 1-.71-1.73V4.69a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44m0 10.75v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.75-.69a2.42 2.42 0 0 1-.71-1.73v-3.87a2.4 2.4 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44zm-10.75.01v3.87a2.46 2.46 0 0 1-2.45 2.43h-3.86a2.42 2.42 0 0 1-2.43-2.43v-3.87A2.46 2.46 0 0 1 4.685 13h3.87a2.5 2.5 0 0 1 1.73.72a2.45 2.45 0 0 1 .71 1.73"
            />
          </svg>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          end
          to="/dashboard/contributors"
          className="flex items-center gap-[10px]"
          activeClassName="active-link"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <circle
                cx="8"
                cy="8"
                r="2.5"
                stroke="currentColor"
                stroke-linecap="round"
              />
              <path
                stroke="currentColor"
                d="M11.768 8.5a2 2 0 1 1 3.464 2a2 2 0 0 1-3.464-2Z"
              />
              <path
                fill="currentColor"
                d="m13.405 17.507l.494-.079zM12.5 18h-9v1h9zm-9.412-.414c.13-.814.442-1.971 1.176-2.915C4.979 13.751 6.119 13 8 13v-1c-2.199 0-3.626.9-4.526 2.057c-.88 1.134-1.231 2.48-1.373 3.371zM8 13c1.881 0 3.02.75 3.736 1.671c.734.944 1.046 2.1 1.176 2.915l.987-.158c-.142-.89-.492-2.237-1.373-3.37C11.626 12.9 10.199 12 8 12zm-4.5 5c-.292 0-.443-.217-.412-.414l-.987-.158C1.958 18.322 2.687 19 3.5 19zm9 1c.813 0 1.542-.678 1.4-1.572l-.988.158c.031.197-.12.414-.412.414z"
              />
              <path
                fill="currentColor"
                d="m17.297 17.416l-.485.122zM11.8 13.981l-.268-.422l-.515.327l.422.44zm1.605 3.526l.494-.079zm2.99.493H12.5v1h3.895zm.417-.462c.053.215-.104.462-.417.462v1c.87 0 1.62-.772 1.387-1.705zM13.5 14c1.028 0 1.75.503 2.278 1.207c.54.718.856 1.624 1.034 2.33l.97-.242c-.192-.764-.55-1.816-1.204-2.689C15.913 13.72 14.92 13 13.5 13zm-1.432.403c.39-.247.858-.403 1.432-.403v-1c-.768 0-1.421.212-1.968.559zm-.629-.077c.947.99 1.326 2.339 1.473 3.26l.987-.158c-.16-1-.583-2.586-1.737-3.793zm1.473 3.26c.031.197-.12.414-.412.414v1c.813 0 1.542-.678 1.4-1.572z"
              />
              <rect
                width="4.5"
                height=".5"
                x="16.25"
                y="5.25"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="0.5"
                rx=".25"
              />
              <rect
                width="4.5"
                height=".5"
                x="18.75"
                y="3.25"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="0.5"
                rx=".25"
                transform="rotate(90 18.75 3.25)"
              />
            </g>
          </svg>
          <span>FSCs</span>
        </NavLink>
        <NavLink
          end
          to="/dashboard/markets"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="4"
            >
              <path fill="currentColor" d="M6 20h8v14H6zm14-6h8v26h-8z" />
              <path stroke-linecap="round" d="M24 44v-4" />
              <path fill="currentColor" d="M34 12h8v9h-8z" />
              <path stroke-linecap="round" d="M10 20V10m28 24V21m0-9V4" />
            </g>
          </svg>
          <span>Markets</span>
        </NavLink>
        <NavLink
          end
          to="/dashboard/products"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.9 4.9 0 0 1 12 1c2.76 0 5 2.24 5 5zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6m10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22"
            />
          </svg>
          <span>Products</span>
        </NavLink>
        <NavLink
          end
          to="/dashboard/users"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m8 8a3 3 0 1 0-3-3a3 3 0 0 0 3 3m0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1m0 5a5 5 0 0 0-3.06 1.05A7 7 0 0 0 2 20a1 1 0 0 0 2 0a5 5 0 0 1 10 0a1 1 0 0 0 2 0a6.9 6.9 0 0 0-.86-3.35A3 3 0 0 1 20 19a1 1 0 0 0 2 0a5 5 0 0 0-5-5"
            />
          </svg>
          <span>Users</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-[20px]">
        <NavLink
          end
          to="/dashboard/settings"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2" />
              <circle cx="12" cy="12" r="3" />
            </g>
          </svg>
          <span>Settings</span>
        </NavLink>
        <NavLink
          end
          to="/dashboard/help"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240s240-107.45 240-240S388.55 16 256 16m0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256S156.59 76 256 76m0 30c-66.274 0-120 40.294-120 90c0 30 60 30 60 0c0-16.57 26.862-30 60-30s60 13.43 60 30s-30 15-60 30a19.6 19.6 0 0 0-4.688 3.28C226.53 244.986 226 271.926 226 286v15c0 16.62 13.38 30 30 30s30-13.38 30-30v-15c0-45 90-40.294 90-90s-53.726-90-120-90m0 240a30 30 0 0 0-30 30a30 30 0 0 0 30 30a30 30 0 0 0 30-30a30 30 0 0 0-30-30"
            />
          </svg>
          <span>Help</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
