export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

export const toggleVisibility=(onScroll)=>()=>{
window.screenY>300 && onScroll()
}