import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {

    // here we have the main part of the app
    // - Sidebar is the left part, showing conversations and the search bar
    // - Chat is where the messages will be displayed
    
    return (
        <div className='home'>
            <div className="container">
                <Sidebar></Sidebar>
                <Chat></Chat>
            </div>
        </div>
    )  
}

export default Home