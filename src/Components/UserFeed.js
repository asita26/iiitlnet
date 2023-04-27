import React from 'react'
import { useEffect ,useState} from 'react'
import Header from './Header'
import axios from 'axios'
const UserFeed = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PORT}/addpost`).then((res) => {
            console.log(res.data)
            let dt=res.data
            dt.reverse()
            setData(dt);
          });

    },[])

    return (
        <div className='translate-y-[-80px]'>
        <Header/>
            <div className='grid grid-flow-row grid-cols-3 w-2/3  m-auto translate-y-[100px] rounded-lg '>
                <div className='my-2 w-[300px] bg-white shadow-lg rounded-lg h-fit mr-2 '>
                    <div className='w-full h-[100px] bg-white rounded-lg my-0'/>
                    <div>
                        <img className='rounded-full h-20 w-20 m-auto border-[2px] border-yello-500 translate-y-[-30px]' src={sessionStorage.getItem("imageUrl")} alt="" />
                        <h2 className='text-center text-xl font-semibold my-1'> {sessionStorage.getItem('fName') +" "+sessionStorage.getItem('lName')} </h2>
                        <p className="mb-4 text-sm mx-5 leading-relaxed text-blueGray-700"> {sessionStorage.getItem('bio')}
                        </p>
                        {/* <div className='text-center py-3 border-[1px] hover:bg-gray-100 cursor-pointer '>
                            Add Event
                        </div>
                        <div className='text-center py-3 border-[1px] hover:bg-gray-100 cursor-pointer '>
                            See Event
                        </div>
                        <div className='text-center py-3 border-[1px] hover:bg-gray-100 cursor-pointer '>
                            Profile
                        </div> */}
                    </div>
                </div>
                <div className='w-[150%]'>
                    <div className='bg-white mt-2 py-5 rounded-2xl px-3 shadow-lg'>
                        <div className='flex'>
                            <img className='w-14 h-14 rounded-full' src={sessionStorage.getItem("imageUrl")} alt="" />
                            <input type="text" onClick={()=>{
                                window.location.href = "/addpost";
                            }} placeholder='start a post' className='w-full  mx-3  rounded-3xl h-12 py-2 px-3  text-gray-300 border-gray-200' />
                        </div>
                        <div className='my-2 flex justify-between px-3'>

                        </div>

                    </div>



                    <div className='gap-y-2 my-4'>

                    {
                        data.map((item,index)=>{
                            return(
                            <div className='bg-white py-2 px-3 w-full rounded-lg shadow-lg my-3'>

                            <div className='flex'>
                                <img className='w-14 h-14 rounded-full' src={item.userimage} alt="" />
                                <div className=' mx-2 gap-y-1'>
                                    <h2 className='text-[18px] font-bold'>
                                        {item.name}
                                    </h2>
                                    
                                    <h2 className='text-[12px] text-gray-600'>
                                       {item.time}
                                    </h2>
                                </div>
                            </div>

                            <div className='text-[14px] my-3 px-1' >
                               {item.desc}
                            </div>

                            {
                                item.image &&
                                <div>
                                <img src={item.image} className='w-full max-h-[500px]' alt="" />
                                </div>
                            }

                        </div>
                            );
                        })
                    }

                        



                      



                     



                       
                    </div>





                </div>


            </div>
        </div>
    )
}

export default UserFeed
