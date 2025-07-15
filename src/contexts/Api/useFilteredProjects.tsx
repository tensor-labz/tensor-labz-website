import { useProjectDataContext } from "./ProjectDataContext";
import { useServiceContext } from "../ServiceContext";
import { useLocation } from "react-router-dom";
interface ProjectItem {
  id: string;
  service: string;
  [key: string]: any;
}
export const useFilteredProjects = () => {
    const { rawProjects, isLoading } = useProjectDataContext();
    const { activeTab } = useServiceContext();
    const location = useLocation(); // ✅ react to ?page

    if (!rawProjects) return [[], isLoading];

    let filtered:ProjectItem[] = rawProjects;

    if (activeTab.slug && activeTab.slug !== "all") {
        filtered = filtered.filter(item => item.service === activeTab.slug);
    }
    const totalItems:number = filtered.length;
    const urlSearchParams = new URLSearchParams(location.search);
    const page = urlSearchParams.get("page");

    if (page) {
        const pageNumber = parseInt(page, 10) || 1;
        const perPage = 6;
        const start = (pageNumber - 1) * perPage;
        filtered = filtered.slice(start, start + perPage);
    }

    return {filtered, totalItems, isLoading};
};
