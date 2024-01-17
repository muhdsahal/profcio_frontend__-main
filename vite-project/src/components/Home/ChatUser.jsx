import { faAdd, faEllipsisVertical, faPaperPlane, faSmileBeam, faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import

function ChatUser() {
    const [clientstate, setClientState] = useState('');
    const [senderdetails, setSenderDetails] = useState(userInfo);
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState([]);
    const [ChatList, setChatList] = useState([])
    const [recipientDetails, setrecipientDetails] = useState([])
  return (
    <div>
            <div className='flex'>
                <div className='flex flex-col max-w-[24rem] '>
                    {(ChatList.map((ListChat, index) => (
                        (userInfo.email != ListChat.email ? <Card key={index} className=" flex flex-row gap-2 h-[6rem] border-[1px]  border-[#b4b2b2] rounded-b-none bg-[#ededed] mt-2 ml-16  shadow-2xl shadow-blue-gray-900/2" style={{ borderBottom: '1px solid #9da3a3 ' }}>
                            {(ListChat.profile_image ? <img src={ListChat.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                            <h1 className='font-prompt-normal ml-3 mt-9 text-sm uppercase'>{ListChat.username}</h1>
                            <div onClick={(e) => StartChat(ListChat.email)} className='text-center w-24  mt-8 h-7 ml-8 font-prompt bg-[#051339] rounded-md text-white  hover:bg-[#1e2c51] hover:cursor-pointer'>
                                <p className='mt-[2px]' ><span className='text-[#051339] ml-1'>.</span>Message<span className='text-[#051339] mr-1'>.</span></p>

                            </div>
                            <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 mt-9 rounded-full hover:text-[#000000]   mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem>Block</MenuItem>
                                    <MenuItem>Archive</MenuItem>
                                </MenuList>
                            </Menu>
                        </Card> : '')
                    )))}

                </div>
                {(recipientDetails.length != 0 ? <Card className='ml-24 w-[60%] h-[35rem]  mt-2 border-[1px]'>
                    <Card className=' w-full  rounded-b-none  h-20 bg-[#051339] '>
                        <div className='flex'>
                            <div>
                                {(recipientDetails.profile_image ? <img src={recipientDetails.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                    <UserCircleIcon className="ml-10 rounded-full w-14 h-14  mt-4 text-[#FAFAFA] " />)}
                            </div>
                            <h1 className='font-prompt-normal ml-3 mt-7 text-[#FAFAFA] text-lg uppercase '>{recipientDetails.username}</h1>
                            <FontAwesomeIcon icon={faVideoCamera} color='#FAFAFA' className=' absolute right-24 w-6 h-6 mt-7 rounded-full hover:text-[#c5c3c3]    e  ' />

                            <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faEllipsisVertical} color='#FAFAFA' className=' absolute right-10 w-6 h-6 mt-7 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem>Block</MenuItem>
                                    <MenuItem>Archive</MenuItem>
                                </MenuList>
                            </Menu>

                        </div>
                        <div className='mt-2'>
                            {(messages.map((message) => message.sender_email === userInfo.email ?
                                <div className='mt-2 float-right '>
                                    <h1 className='font-prompt-normal text-lg text-white bg-[#324674df] rounded-md  shadow-black w-fit' style={{ paddingLeft: '8px', paddingRight: '8px', paddingBottom: '2px', paddingTop: '2px' }}>{message.message}</h1>
                                    <h1 className=' float-right text-xs'>11.30PM</h1>

                                    <br />
                                </div> : <div className='mt-2 ml-8 '>

                                    <h1 className='font-prompt-normal text-lg text-black bg-[#d4d2d2] rounded-md  shadow-black w-fit' style={{ paddingLeft: '8px', paddingRight: '8px', paddingBottom: '2px', paddingTop: '2px' }}>{message.message}</h1>
                                    <h1 className='text-xs ml-1'>11.30PM</h1>
                                    <br />
                                </div>))}

                        </div>


                    </Card>
                    <div className='absolute bottom-0 w-full bg-[#e3e2e2]'>
                        <FontAwesomeIcon icon={faAdd} color='#000000' className='  w-6 h-6 mt-4 ml-2 mr-2 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' />
                        <FontAwesomeIcon icon={faSmileBeam} className=' text-[#e8dd43] border-[1px]  w-6 h-6 mt-4 ml-2 mr-2 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' />

                        <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} className='w-[80%] h-12  rounded-md  border-[1px] border-black font-prompt' placeholder='Type a message' style={{ paddingLeft: '20px' }} />
                        <Button onClick={sendMessage} className='w-16 h-12 ml-4 bg-[#051339] -mt-1'>
                            <FontAwesomeIcon icon={faPaperPlane} className=' text-[#FAFAFA]   w-6 h-6    rounded-full hover:text-[#aeaaaa] rotate-45  ' />

                        </Button>
                    </div>


                </Card> : '')}
            </div>
        </div>
  )
}

export default ChatUser