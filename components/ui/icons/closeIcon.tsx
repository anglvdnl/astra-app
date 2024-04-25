export default function CloseIcon({color}: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3955 9.59473L9.60352 14.3867" stroke={color} strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M14.397 14.3898L9.60101 9.59277" stroke={color} strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M16.3345 2.75H7.66549C4.64449 2.75 2.75049 4.889 2.75049 7.916V16.084C2.75049 19.111 4.63549 21.25 7.66549 21.25H16.3335C19.3645 21.25 21.2505 19.111 21.2505 16.084V7.916C21.2505 4.889 19.3645 2.75 16.3345 2.75Z"
                  stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}