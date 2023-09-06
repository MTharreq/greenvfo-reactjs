import { NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';

export default function Nav() {
	// GET HEIGHT OF AN ELEMENT
	const [height, setHeight] = useState(0);
	const elementRef = useRef(null);
	
	useEffect(() => {
		setHeight(elementRef.current.offsetHeight);
	}, []);

	// ACTIVE LINK HANDLER
    const activeLink = 'flex gap-2 items-center cursor-pointer px-4 py-2 rounded-full bg-primary text-white'
    const inactiveLink = 'flex gap-2 items-center cursor-pointer px-4 py-2 rounded-full hover:text-primary hover:bg-[#E8EEDC]'
	
	return (
    <>
	<nav ref={elementRef} className='navbar absolute top-0 z-10 bg-white flex justify-between w-screen py-3 px-8 items-center shadow-md'>
		{/* LOGO */}
		<div className="text-blackFo font-bold text-2xl">
			<span className='text-primary'>Green</span>vfo
		</div>
		<p className='hidden'>{height}</p>
		{/* RIGHT CONTENT */}
		<div className="">
			<ul className='flex gap-4 text-secondary font-medium text-sm'>
				<NavLink to="/" className={({ isActive }) => (isActive ? activeLink : inactiveLink )}>
                    <span className="material-symbols-outlined">home</span>Home
                </NavLink>
				<NavLink to="/list-flora" className={({ isActive }) => (isActive ? activeLink : inactiveLink )}>
                    <span className="material-symbols-outlined">menu</span>List Flora
                </NavLink>
				<NavLink to="/add-flora" className={({ isActive }) => (isActive ? activeLink : inactiveLink )}>
                    <span className="material-symbols-outlined">add_circle</span>Add Flora
                </NavLink>
			</ul>
		</div>
	</nav>
    </>
	)
}