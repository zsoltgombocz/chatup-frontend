import { getPreviousRoute } from "@/config/linkedRoutes";
import { useLocation, useNavigate } from "react-router-dom";

interface useNavigateBackInterface {
    navigateBack: () => void,
}

export const useNavigateBack = (): useNavigateBackInterface => {
    const location = useLocation();
    const navigate = useNavigate();

    const navigateBack = (): void => {
        const prevRoute = getPreviousRoute(location.pathname);

        navigate(prevRoute?.route || '/', { replace: true });
    }

    return { navigateBack };
}