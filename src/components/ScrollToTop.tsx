import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable browser's default scroll restoration behavior on reload
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Check if there is a hash in the URL to prevent overriding smooth scroll to sections
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
