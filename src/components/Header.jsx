import { useState, useEffect } from 'react';

const NavbarHeader = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#FFCB05] text-black text-xs">
      <div>Welcome to Pokemon Shop!</div>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.1792 7.7934C3.19 4.61296 5.77702 2.04346 8.95746 2.05423C12.1379 2.06507 14.7074 4.65209 14.6966 7.83253V7.89774C14.6575 9.96514 13.5031 11.876 12.0879 13.3695C11.2785 14.21 10.3747 14.954 9.39442 15.5869C9.1323 15.8136 8.74349 15.8136 8.48137 15.5869C7.02 14.6357 5.7374 13.4348 4.69224 12.039C3.76071 10.822 3.23182 9.34472 3.1792 7.81296V7.7934Z" stroke="#373737" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.93794 9.7499C9.95726 9.7499 10.7836 8.92357 10.7836 7.90425C10.7836 6.88492 9.95726 6.05859 8.93794 6.05859C7.91861 6.05859 7.09229 6.88492 7.09229 7.90425C7.09229 8.92357 7.91861 9.7499 8.93794 9.7499Z" stroke="#373737" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Contact 123456</span>
        </div>
        <div className="flex items-center space-x-1">
          |
        </div>
        <div className="flex items-center space-x-1">
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10.25C6.39782 10.25 6.77936 10.092 7.06066 9.81066C7.34196 9.52936 7.5 9.14782 7.5 8.75C7.5 8.35218 7.34196 7.97064 7.06066 7.68934C6.77936 7.40804 6.39782 7.25 6 7.25C5.60218 7.25 5.22064 7.40804 4.93934 7.68934C4.65804 7.97064 4.5 8.35218 4.5 8.75C4.5 9.14782 4.65804 9.52936 4.93934 9.81066C5.22064 10.092 5.60218 10.25 6 10.25V10.25ZM13.5 10.25C13.8978 10.25 14.2794 10.092 14.5607 9.81066C14.842 9.52936 15 9.14782 15 8.75C15 8.35218 14.842 7.97064 14.5607 7.68934C14.2794 7.40804 13.8978 7.25 13.5 7.25C13.1022 7.25 12.7206 7.40804 12.4393 7.68934C12.158 7.97064 12 8.35218 12 8.75C12 9.14782 12.158 9.52936 12.4393 9.81066C12.7206 10.092 13.1022 10.25 13.5 10.25V10.25Z" stroke="#373737" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5375 8.75H11.25V0.95C11.25 0.830653 11.2026 0.716193 11.1182 0.631802C11.0338 0.547411 10.9193 0.5 10.8 0.5H0.75M4.2375 8.75H2.7C2.64091 8.75 2.58239 8.73836 2.52779 8.71575C2.4732 8.69313 2.42359 8.65998 2.3818 8.6182C2.34002 8.57641 2.30687 8.5268 2.28425 8.47221C2.26164 8.41761 2.25 8.35909 2.25 8.3V4.625" stroke="#373737" strokeLinecap="round" />
            <path d="M1.5 2.75H4.5" stroke="#373737" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.25 2.75H15.4575C15.5445 2.75002 15.6296 2.77525 15.7025 2.82264C15.7755 2.87002 15.8331 2.93753 15.8685 3.017L17.211 6.038C17.2366 6.09536 17.2499 6.15744 17.25 6.22025V8.3C17.25 8.35909 17.2384 8.41761 17.2157 8.47221C17.1931 8.5268 17.16 8.57641 17.1182 8.6182C17.0764 8.65998 17.0268 8.69313 16.9722 8.71575C16.9176 8.73836 16.8591 8.75 16.8 8.75H15.375M11.25 8.75H12" stroke="#373737" strokeLinecap="round" />
          </svg>
          <span>Track your order</span>
        </div>
        <div className="flex items-center space-x-1">
          |
        </div>
        <div className="flex items-center space-x-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.5956 5.29193C3.5956 4.35518 4.35535 3.59543 5.29135 3.59543H6.0631C6.5101 3.59543 6.93985 3.41843 7.25785 3.10268L7.7971 2.56268C8.45785 1.89893 9.53185 1.89593 10.1956 2.55668L10.2024 2.56268L10.7424 3.10268C11.0596 3.41843 11.4894 3.59543 11.9371 3.59543H12.7081C13.6449 3.59543 14.4046 4.35518 14.4046 5.29193V6.06218C14.4046 6.51068 14.5816 6.93968 14.8974 7.25768L15.4374 7.79768C16.1011 8.45843 16.1049 9.53168 15.4441 10.1962L15.4374 10.2029L14.8974 10.7429C14.5816 11.0594 14.4046 11.4899 14.4046 11.9369V12.7087C14.4046 13.6454 13.6449 14.4044 12.7081 14.4044H11.9371C11.4894 14.4044 11.0596 14.5822 10.7424 14.8979L10.2024 15.4372C9.54235 16.1017 8.46835 16.1047 7.80385 15.4439C7.8016 15.4417 7.79935 15.4394 7.7971 15.4372L7.25785 14.8979C6.93985 14.5822 6.5101 14.4044 6.0631 14.4044H5.29135C4.35535 14.4044 3.5956 13.6454 3.5956 12.7087V11.9369C3.5956 11.4899 3.41785 11.0594 3.1021 10.7429L2.56285 10.2029C1.89835 9.54218 1.89535 8.46818 2.5561 7.80443L2.56285 7.79768L3.1021 7.25768C3.41785 6.93968 3.5956 6.51068 3.5956 6.06218V5.29193Z" stroke="#373737" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.07227 10.9273L10.9273 7.07227" stroke="#373737" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.9248 11.4918C10.7748 11.4918 10.6323 11.4318 10.5273 11.3268C10.4748 11.2743 10.4373 11.2068 10.4073 11.1393C10.3773 11.0718 10.3623 11.005 10.3623 10.9293C10.3623 10.8543 10.3773 10.7793 10.4073 10.7118C10.4373 10.6443 10.4748 10.5843 10.5273 10.5318C10.7373 10.3218 11.1123 10.3218 11.3223 10.5318C11.3748 10.5843 11.4198 10.6443 11.4498 10.7118C11.4723 10.7793 11.4873 10.8543 11.4873 10.9293C11.4873 11.005 11.4723 11.0718 11.4498 11.1393C11.4198 11.2068 11.3748 11.2743 11.3223 11.3268C11.2173 11.4318 11.0748 11.4918 10.9248 11.4918Z" fill="#373737" />
            <path d="M7.06982 7.63711C6.99482 7.63711 6.92732 7.62136 6.85982 7.59136C6.79232 7.56136 6.72482 7.52461 6.67232 7.47211C6.61982 7.41211 6.58232 7.35211 6.55232 7.28461C6.52232 7.21636 6.50732 7.14961 6.50732 7.07461C6.50732 6.99886 6.52232 6.92461 6.55232 6.85711C6.58232 6.78961 6.61982 6.72211 6.67232 6.67711C6.88982 6.46636 7.25732 6.46636 7.46732 6.67711C7.57232 6.78136 7.63232 6.92461 7.63232 7.07461C7.63232 7.14961 7.62482 7.21636 7.59482 7.28461C7.56482 7.35211 7.51982 7.41211 7.46732 7.47211C7.41482 7.52461 7.35482 7.56136 7.28732 7.59136C7.21982 7.62136 7.14482 7.63711 7.06982 7.63711Z" fill="#373737" />
          </svg>
          <span>All Offers</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
