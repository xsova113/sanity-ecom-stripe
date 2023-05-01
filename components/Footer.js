import React from 'react'
import {
  AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiOutlineGithub
} from 'react-icons/ai'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footer-container'>
      <p>{currentYear} Azeros Headphones All rights reserved</p>
      <p className='icons'>
        <AiFillFacebook />
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiOutlineGithub />
      </p>
    </div>
  )
}
export default Footer