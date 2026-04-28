/**
 * Mail icon component for email/contact functionality.
 * Simple envelope SVG icon used in header and contacts.
 * 
 * @component
 * @returns {JSX.Element} Mail SVG icon
 */
const MailIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-10 5L2 7" />
        </svg>
    );
};

export default MailIcon;
