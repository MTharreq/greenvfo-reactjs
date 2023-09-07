import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddFlora from './pages/AddFlora'
// import ListFlora from './pages/ListFlora'
import NotFound from './pages/NotFound'
import Nav from './layouts/Nav'
// import CRUDTets from './pages/CRUDTest'

function App() {  
	return (
    <>
		<Routes>
			<Route path='/*' element={ <Nav/> }/>
		</Routes>
		<Routes>
			<Route path='/' element={ <Home/> } />
			<Route path='/add-flora' element={ <AddFlora/> } />
			<Route path='*' element={ <NotFound/> } />
			{/* <Route path='/list-flora' element={ <ListFlora/> } /> */}
			{/* <Route path='/crud-test' element={ <CRUDTets/> } /> */}
		</Routes>
    </>
	)
}

export default App