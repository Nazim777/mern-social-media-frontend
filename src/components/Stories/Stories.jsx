import './Stories.css'
import { useSelector } from 'react-redux'

const AllStories = [
    {
        id:1,
        name:'Rahim',
        image:'https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id:2,
        name:'Alamin',
        image:'https://images.pexels.com/photos/13719224/pexels-photo-13719224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id:3,
        name:'Habib',
        image:'https://images.pexels.com/photos/13922647/pexels-photo-13922647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id:4,
        name:'Hakim',
        image:'https://images.pexels.com/photos/13732244/pexels-photo-13732244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    

]




const Stories = () => {
    const {user} =useSelector((state)=>state.user)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='stories'>
        <div className='story'>
                <img src={user?.data?.profilePicture?serverPublic+user?.data?.profilePicture:"https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                <span>{user?.data?.name}</span>
                <button>+</button>

            </div>
        {
            AllStories.map((item)=>
            <div className='story'>
                <img src={item.image} alt="" />
                <span>{item.name}</span>

            </div>)
        }
      
    </div>
  )
}

export default Stories
