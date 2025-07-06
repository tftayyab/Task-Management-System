// src/components/icons/FormIcons.jsx

// Person-related icons
export const FirstNameIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 29 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 9.375C17.4162 9.375 19.375 7.74271 19.375 5.72917C19.375 3.71563 17.4162 2.08334 15 2.08334C12.5838 2.08334 10.625 3.71563 10.625 5.72917C10.625 7.74271 12.5838 9.375 15 9.375Z"
      fill="black"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 21.3542C2.5 16.7516 7.53688 13.0208 13.75 13.0208"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.375 21.875L25.625 16.6667L23.125 14.5833L16.875 19.7917V21.875H19.375Z"
      fill="black"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LastNameIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 29 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 9.75C17.4162 9.75 19.375 8.05242 19.375 5.95834C19.375 3.86426 17.4162 2.16667 15 2.16667C12.5838 2.16667 10.625 3.86426 10.625 5.95834C10.625 8.05242 12.5838 9.75 15 9.75Z"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 22.2083C2.5 17.4216 7.53688 13.5417 13.75 13.5417"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.375 22.75L25.625 17.3333L23.125 15.1667L16.875 20.5833V22.75H19.375Z"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Account Info Icon
export const UsernameIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 29 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4999 4.5C15.7818 4.5 17.0112 4.97411 17.9176 5.81802C18.824 6.66193 19.3333 7.80653 19.3333 9C19.3333 10.1935 18.824 11.3381 17.9176 12.182C17.0112 13.0259 15.7818 13.5 14.4999 13.5C13.218 13.5 11.9887 13.0259 11.0822 12.182C10.1758 11.3381 9.66659 10.1935 9.66659 9C9.66659 7.80653 10.1758 6.66193 11.0822 5.81802C11.9887 4.97411 13.218 4.5 14.4999 4.5ZM14.4999 15.75C19.8408 15.75 24.1666 17.7637 24.1666 20.25V22.5H4.83325V20.25C4.83325 17.7637 9.15909 15.75 14.4999 15.75Z"
      fill="#212427"
    />
  </svg>
);

export const EmailIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 29 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.6666 4.5H4.33329C3.14163 4.5 2.17746 5.5125 2.17746 6.75L2.16663 20.25C2.16663 21.4875 3.14163 22.5 4.33329 22.5H21.6666C22.8583 22.5 23.8333 21.4875 23.8333 20.25V6.75C23.8333 5.5125 22.8583 4.5 21.6666 4.5ZM21.6666 9L13 14.625L4.33329 9V6.75L13 12.375L21.6666 6.75V9Z"
      fill="black"
    />
  </svg>
);

export const PasswordIcon = ({ className = "w-6 h-6 text-[#212427]" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1a5 5 0 00-5 5v4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 5a3 3 0 116 0v4H9V6zm3 7a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0112 13z" />
  </svg>
);

export const ConfirmPasswordIcon = ({ className = "w-6 h-6 text-[#212427]" }) => (
  <svg
    className="w-5.5 h-5.5"
    viewBox="0 0 24 24"
    fill="white"
    stroke="black"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1a5 5 0 00-5 5v4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 5a3 3 0 116 0v4H9V6zm3 7a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0112 13z" />
  </svg>
);

export const EyeOffIcon = ({ className = "w-6 h-6 text-gray-600" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 
         0-1.176.203-2.3.575-3.325m4.045 1.575A3.978 3.978 0 0112 7c2.21 0 
         4 1.79 4 4a3.978 3.978 0 01-1.825 3.375M15 15l6 6"
    />
  </svg>
);

export const EyeIcon = ({ className = "w-6 h-6 text-gray-600" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 
         2.943 9.542 7-.062.204-.128.406-.2.606"
    />
  </svg>
);

export const TickIcon = () => (
  <svg
    className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-[3px] top-[5px]"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.192 9.192-4.243-4.243a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9.849-9.945z" />
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6 text-gray-600" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="32.4" width="28" height="3.2" fill="#FF6767"/>
    <rect x="10" y="22.4" width="28" height="3.2" fill="#FF6767"/>
    <rect x="10" y="12.4" width="28" height="3.2" fill="#FF6767"/>
  </svg>
);

export const SearchIcon = () => (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 w-5 h-5 text-[#FF6767] pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
);

export const TaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="27"
    viewBox="0 0 24 27"
    fill="none"
  >
    <path
      d="M19.8758 21.9652L18.6902 21.2797V18.8979C18.6902 18.8308 18.6636 18.7665 18.6163 18.7191C18.5689 18.6717 18.5047 18.6451 18.4377 18.6451C18.3708 18.6451 18.3066 18.6717 18.2592 18.7191C18.2119 18.7665 18.1853 18.8308 18.1853 18.8979V21.4258C18.1853 21.4701 18.1969 21.5137 18.2191 21.5522C18.2413 21.5906 18.2731 21.6225 18.3115 21.6447L19.6233 22.4031C19.6519 22.4199 19.6836 22.4308 19.7165 22.4352C19.7493 22.4397 19.7828 22.4375 19.8148 22.4289C19.8468 22.4203 19.8769 22.4054 19.9031 22.3851C19.9293 22.3648 19.9513 22.3394 19.9677 22.3105C20.0012 22.2525 20.0103 22.1836 19.9931 22.1188C19.9759 22.0541 19.9337 21.9988 19.8758 21.9652ZM18.4377 16.3699C15.649 16.3699 13.3885 18.6334 13.3885 21.4258C13.3885 24.2181 15.649 26.4816 18.4377 26.4816C21.2249 26.4786 23.484 24.2166 23.487 21.4258C23.487 18.6334 21.2264 16.3699 18.4377 16.3699ZM18.4377 25.976C17.841 25.976 17.25 25.8583 16.6987 25.6297C16.1474 25.401 15.6464 25.0658 15.2244 24.6433C14.8024 24.2208 14.4677 23.7191 14.2393 23.1671C14.011 22.615 13.8934 22.0233 13.8934 21.4258C13.8934 20.8282 14.011 20.2365 14.2393 19.6845C14.4677 19.1324 14.8024 18.6308 15.2244 18.2083C15.6464 17.7857 16.1474 17.4506 16.6987 17.2219C17.25 16.9932 17.841 16.8755 18.4377 16.8755C19.6426 16.8769 20.7977 17.3567 21.6496 18.2097C22.5015 19.0628 22.9807 20.2194 22.9821 21.4258C22.9821 22.6326 22.5033 23.79 21.6511 24.6433C20.7988 25.4966 19.643 25.976 18.4377 25.976Z"
      fill="#888888"
      stroke="#A1A3AB"
    />
    <path
      d="M13.2424 1.99946H11.2561V1.33297C11.255 0.97977 11.1152 0.641336 10.867 0.391584C10.6189 0.141831 10.2827 0.00105486 9.93182 0H4.63485C4.28396 0.00105486 3.94774 0.141831 3.69963 0.391584C3.45151 0.641336 3.31165 0.97977 3.31061 1.33297V1.99946H1.32424C0.973354 2.00051 0.637136 2.14129 0.389019 2.39104C0.140903 2.64079 0.00104796 2.97923 0 3.33243V17.3286C0.00104796 17.6818 0.140903 18.0203 0.389019 18.27C0.637136 18.5198 0.973354 18.6605 1.32424 18.6616H7.28333V17.3286H1.32424V3.33243H3.31061V5.33189H11.2561V3.33243H13.2424V10.6638H14.5667V3.33243C14.5656 2.97923 14.4258 2.64079 14.1776 2.39104C13.9295 2.14129 13.5933 2.00051 13.2424 1.99946ZM9.93182 3.99891H4.63485V1.33297H9.93182V3.99891Z"
      fill="#A1A3AB"
    />
  </svg>
);

export const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
  >
    <path
      d="M10.0595 7.0435H6.19048V10.9126C6.19048 11.1178 6.10895 11.3146 5.96383 11.4597C5.81871 11.6048 5.62189 11.6864 5.41667 11.6864C5.21144 11.6864 5.01462 11.6048 4.8695 11.4597C4.72438 11.3146 4.64286 11.1178 4.64286 10.9126V7.0435H0.773809C0.568582 7.0435 0.371761 6.96198 0.226644 6.81686C0.0815263 6.67174 0 6.47492 0 6.26969C0 6.06447 0.0815263 5.86765 0.226644 5.72253C0.371761 5.57741 0.568582 5.49588 0.773809 5.49588H4.64286V1.62684C4.64286 1.42161 4.72438 1.22479 4.8695 1.07967C5.01462 0.934553 5.21144 0.853027 5.41667 0.853027C5.62189 0.853027 5.81871 0.934553 5.96383 1.07967C6.10895 1.22479 6.19048 1.42161 6.19048 1.62684V5.49588H10.0595C10.2648 5.49588 10.4616 5.57741 10.6067 5.72253C10.7518 5.86765 10.8333 6.06447 10.8333 6.26969C10.8333 6.47492 10.7518 6.67174 10.6067 6.81686C10.4616 6.96198 10.2648 7.0435 10.0595 7.0435Z"
      fill="#F24E1E"
    />
  </svg>
);

export const CircleIcon = ({ className = '', stroke = '#F21E1E' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    className={className}
  >
    <path
      d="M1 6.32239C1 7.65294 1.52678 8.92899 2.46447 9.86983C3.40215 10.8107 4.67392 11.3392 6 11.3392C7.32608 11.3392 8.59785 10.8107 9.53553 9.86983C10.4732 8.92899 11 7.65294 11 6.32239C11 4.99184 10.4732 3.71578 9.53553 2.77494C8.59785 1.8341 7.32608 1.30554 6 1.30554C4.67392 1.30554 3.40215 1.8341 2.46447 2.77494C1.52678 3.71578 1 4.99184 1 6.32239Z"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OptionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="5"
    viewBox="0 0 14 5"
    fill="none"
  >
    <path
      d="M2.31203 4.00458C3.03665 4.00458 3.62407 3.32325 3.62407 2.48278C3.62407 1.6423 3.03665 0.960968 2.31203 0.960968C1.58742 0.960968 1 1.6423 1 2.48278C1 3.32325 1.58742 4.00458 2.31203 4.00458Z"
      stroke="#A1A3AB"
    />
    <path
      d="M6.90417 4.00458C7.62878 4.00458 8.2162 3.32325 8.2162 2.48278C8.2162 1.6423 7.62878 0.960968 6.90417 0.960968C6.17955 0.960968 5.59213 1.6423 5.59213 2.48278C5.59213 3.32325 6.17955 4.00458 6.90417 4.00458Z"
      stroke="#A1A3AB"
    />
    <path
      d="M11.4963 4.00458C12.2209 4.00458 12.8083 3.32325 12.8083 2.48278C12.8083 1.6423 12.2209 0.960968 11.4963 0.960968C10.7717 0.960968 10.1842 1.6423 10.1842 2.48278C10.1842 3.32325 10.7717 4.00458 11.4963 4.00458Z"
      stroke="#A1A3AB"
    />
  </svg>
);

export const DotIcon = ({ className = '', fill = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 6 6"
    className={className}
    fill="none"
  >
    <circle cx="2.67254" cy="3.41196" r="2.53873" fill={fill} />
  </svg>
);

export const DashboardSelectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M13.3333 8V0H24V8H13.3333ZM0 13.3333V0H10.6667V13.3333H0ZM13.3333 24V10.6667H24V24H13.3333ZM0 24V16H10.6667V24H0Z"
      fill="#FF6767"
    />
  </svg>
);

export const DashboardNotSelectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M13.3333 8V0H24V8H13.3333ZM0 13.3333V0H10.6667V13.3333H0ZM13.3333 24V10.6667H24V24H13.3333ZM0 24V16H10.6667V24H0Z"
      fill="white"
    />
  </svg>
);

export const MyTasksSelectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 22H19C20.103 22 21 21.103 21 20V5C21 3.897 20.103 3 19 3H17C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2H8C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3H5C3.897 3 3 3.897 3 5V20C3 21.103 3.897 22 5 22ZM5 5H7V7H17V5H19V20H5V5Z"
      fill="#FF6767"
    />
    <path
      d="M11 13.586L9.20697 11.793L7.79297 13.207L11 16.414L16.207 11.207L14.793 9.79303L11 13.586Z"
      fill="#FF6767"
    />
  </svg>
);

export const MyTasksNotSelectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 22H19C20.103 22 21 21.103 21 20V5C21 3.897 20.103 3 19 3H17C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2H8C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3H5C3.897 3 3 3.897 3 5V20C3 21.103 3.897 22 5 22ZM5 5H7V7H17V5H19V20H5V5Z"
      fill="white"
    />
    <path
      d="M11 13.586L9.207 11.793L7.793 13.207L11 16.414L16.207 11.207L14.793 9.79303L11 13.586Z"
      fill="white"
    />
  </svg>
);

export const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18.6667 6.66667L16.8 8.53333L18.9333 10.6667H8V13.3333H18.9333L16.8 15.4667L18.6667 17.3333L24 12L18.6667 6.66667ZM2.66667 2.66667H12V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H12V21.3333H2.66667V2.66667Z"
      fill="white"
    />
  </svg>
);

export const CompletedTasksIcon = ({ className = "w-5 h-5 text-[#F24E1E]" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 24" fill="none">
    <path
      d="M2.33333 24H18.6667C19.9535 24 21 22.9236 21 21.6V3.6C21 2.2764 19.9535 1.2 18.6667 1.2H16.3333C16.3333 0.88174 16.2104 0.576515 15.9916 0.351472C15.7728 0.126428 15.4761 0 15.1667 0H5.83333C5.52391 0 5.22717 0.126428 5.00838 0.351472C4.78958 0.576515 4.66667 0.88174 4.66667 1.2H2.33333C1.0465 1.2 0 2.2764 0 3.6V21.6C0 22.9236 1.0465 24 2.33333 24ZM2.33333 3.6H4.66667V6H16.3333V3.6H18.6667V21.6H2.33333V3.6Z"
      fill="#A1A3AB"
    />
    <path
      d="M9.68093 14.1479L7.62296 11.7144L6 13.6335L9.68093 17.9861L15.6574 10.9191L14.0345 9L9.68093 14.1479Z"
      fill="#A1A3AB"
    />
  </svg>
);

export const DeleteTasksIcon = ({ className = "w-5 h-5 text-[#F24E1E]" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    className={className}
  >
    <rect width="36" height="36" rx="8" fill="#FF6767" />
    <path
      d="M12 25C12 26.1 12.9 27 14 27H22C23.1 27 24 26.1 24 25V15C24 13.9 23.1 13 22 13H14C12.9 13 12 13.9 12 15V25ZM24 10H21.5L20.79 9.29C20.61 9.11 20.35 9 20.09 9H15.91C15.65 9 15.39 9.11 15.21 9.29L14.5 10H12C11.45 10 11 10.45 11 11C11 11.55 11.45 12 12 12H24C24.55 12 25 11.55 25 11C25 10.45 24.55 10 24 10Z"
      fill="white"
    />
  </svg>
);

export const EditTasksIcon = ({ className = "w-5 h-5 text-[#F24E1E]" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    className={className}
  >
    <rect width="36" height="36" rx="8" fill="#FF6767" />
    <path
      d="M21 8.94979C22.296 8.94979 23.496 9.35979 24.477 10.0598L15.343 19.1928C15.2475 19.285 15.1713 19.3954 15.1189 19.5174C15.0665 19.6394 15.0389 19.7706 15.0377 19.9034C15.0366 20.0362 15.0619 20.1678 15.1122 20.2907C15.1625 20.4136 15.2367 20.5253 15.3306 20.6192C15.4245 20.7131 15.5361 20.7873 15.659 20.8376C15.7819 20.8879 15.9136 20.9132 16.0464 20.912C16.1792 20.9109 16.3104 20.8833 16.4324 20.8309C16.5544 20.7785 16.6648 20.7023 16.757 20.6068L25.891 11.4728C26.6141 12.4878 27.0019 13.7035 27 14.9498V24.9498C27 25.4802 26.7893 25.9889 26.4142 26.364C26.0391 26.7391 25.5304 26.9498 25 26.9498H11C10.4696 26.9498 9.96086 26.7391 9.58579 26.364C9.21071 25.9889 9 25.4802 9 24.9498V10.9498C9 10.4194 9.21071 9.91065 9.58579 9.53557C9.96086 9.1605 10.4696 8.94979 11 8.94979H21ZM27.657 8.29279C27.8445 8.48031 27.9498 8.73462 27.9498 8.99979C27.9498 9.26495 27.8445 9.51926 27.657 9.70679L25.89 11.4728C25.5006 10.9261 25.0227 10.4482 24.476 10.0588L26.242 8.29279C26.4295 8.10532 26.6838 8 26.949 8C27.2142 8 27.4695 8.10532 27.657 8.29279Z"
      fill="white"
    />
  </svg>
);

export const CrossIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    fill="none"
    className={className}
  >
    <path
      d="M1 1L24 24"
      stroke="#F24E1E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M24 1L1 24"
      stroke="#F24E1E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const CollaborationSelectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 20H22V18C22 15.7909 20.2091 14 18 14H17"
      stroke="#FF6767"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 20H2V18C2 15.7909 3.79086 14 6 14H7"
      stroke="#FF6767"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="#FF6767"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CollaborationNotSelectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 20H22V18C22 15.7909 20.2091 14 18 14H17"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 20H2V18C2 15.7909 3.79086 14 6 14H7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TeamIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Main User */}
    <path
      d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
      fill="#888888"
      stroke="#A1A3AB"
      strokeWidth="1.5"
    />
    {/* Main User's Group */}
    <path
      d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20"
      stroke="#A1A3AB"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Side user */}
    <path
      d="M18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5"
      stroke="#A1A3AB"
      strokeWidth="1.5"
    />
    <path
      d="M6 5C4.34315 5 3 6.34315 3 8C3 9.65685 4.34315 11 6 11"
      stroke="#A1A3AB"
      strokeWidth="1.5"
    />
  </svg>
);

export const ShareIcon = ({ className = "w-5 h-5 text-[#F24E1E]" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    className={className}
  >
    <rect width="36" height="36" rx="8" fill="#FF6767" />
    <path
      d="M25 23C24.337 23 23.737 23.262 23.293 23.695L13.91 18.861C13.969 18.584 14 18.296 14 18C14 17.704 13.969 17.416 13.91 17.139L23.293 12.305C23.737 12.738 24.337 13 25 13C26.657 13 28 11.657 28 10C28 8.343 26.657 7 25 7C23.343 7 22 8.343 22 10C22 10.296 22.031 10.584 22.09 10.861L12.707 15.695C12.263 15.262 11.663 15 11 15C9.343 15 8 16.343 8 18C8 19.657 9.343 21 11 21C11.663 21 12.263 20.738 12.707 20.305L22.09 25.139C22.031 25.416 22 25.704 22 26C22 27.657 23.343 29 25 29C26.657 29 28 27.657 28 26C28 24.343 26.657 23 25 23Z"
      fill="white"
    />
  </svg>
);


