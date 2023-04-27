import React from 'react'
import '../CSS/homepage.css'
import { motion } from "framer-motion";
import Chat from './Chat';
import ChatBot from 'react-simple-chatbot';

const HomePage = () => {
 
  return (
    <div>
   
    <header id="header" class="header">
 
   
    <img src="Screenshot 2023-04-24 at 20.42.53.png" class="logo" alt="Learn English" id="header-img" />
    <nav id="nav-bar" class="nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a class="nav-link" href="#features">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#how-it-works">How It Works</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-link-cta" href="#subscribe">College Website</a>
        </li>
      </ul>
    </nav>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span class="visuallyhidden">Menu</span>
      <span class="hamburger"></span>
    </button>
  </header>
  <main>
    <section class="intro">
      <h1 class="intro__title">
        Welcome to IIITL Alumn<i>us</i>
      </h1>
      <p class="intro__subtitle">
        The ultimate platform for alumni and students to connect, network and keep each other updated.
      </p>
      <a href="/login" class="button">Login</a>
      <img class="intro__illustration" src="./Wavy_Bus-35_Single-06_prev_ui.png" alt="" />
    </section>
    <section id="features" class="features">
      <h2 class="visuallyhidden">Features</h2>
      <ul class="features__list">
        <li className='text-center '>
        <div className='flex items-center text-center'>
        <i class=" translate-x-2  fa-solid fa-magnifying-glass fa-search"></i>
        </div>
        <p><strong>Find</strong> anyone from the IIITL family</p>
        </li>
        <li>
          <i class="fa-solid fa-handshake-simple" ></i>
          <p><strong>Connect</strong> with any IIITL student or alumni</p>
        </li>
        <li>
          <i class="fa-solid fa-pen-to-square" ></i>
          <p><strong>Update</strong> the IIITL family with any milestone you achieve</p>
        </li>
      </ul>
    </section>
    <section id="how-it-works" class="grow">
      <h2 class="section__title grow__title">Grow Together</h2>

      <p>
        Start a meaningful conversation in with any alumni or student, ask any question you want to. Get answers fast, no matter your question.
      </p>
   
      <svg width="898" height="500" viewBox="0 0 898 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="blob">
        <use ></use>
      </svg>
      <img src="Wavy_Bus-35_Single-02_prev_ui.png"alt="" />
    </section>
    <div class="arrow-1"></div>
    <section class="get-feedback">
      <svg width="519" height="366" viewBox="0 0 519 366" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <use ></use>
        </svg>  
        <img src="Wavy_Ppl-07_Single-09_prev_ui.png" alt="" />
      <h2 class="section__title get-feedback__title">
        Stay Updated
      </h2>
      <p>
       Keep your alumni network updated with any milestones and they'll keep you updated with any job opportinities. Get the tools and resources you need, and keep intact
        friendships with people that have the started at the same place as you.
      </p>
         
    </section>
    <div class="arrow-2"></div>
    <section id="how-it-works" class="grow">
      <h2 class="section__title grow__title">Stay Informed</h2>
      <p>
      Stay informed about the details of all the important events happening in and out of college. Know when and where to attend any IIITL event to stay in touch even when you're an alumni.
      </p>
   
      <svg width="898" height="500" viewBox="0 0 898 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="blob">
        <use ></use>
      </svg>
      <img src="Wavy_Bus-28_Single-05_prev_ui.png"alt="" />
    </section>

    </main>
    
 
  <footer class="footer">
    <div class="footer-newsletter" id="subscribe">
      <a href="#">
          <use></use>
     </a>
     <a class="linked"href="https://iiitl.ac.in/" target="_blank">Check out our college website here</a>

  
    </div>
  </footer>

   
  </div>
  
  )
}

export default HomePage
