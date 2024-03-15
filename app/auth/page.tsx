"use client"

import React, {useState} from 'react';
import Login from "@/components/Login";
import Register from "@/components/Register";

interface ComponentMap {
    [key: string]: JSX.Element;
}

function Auth() {
    const [activeComponent, setActiveComponent] = useState('login');

    const toggleLayout = (component: string) => {
        setActiveComponent(component);
    };

    const componentMap: ComponentMap = {
        'login': <Login toggleLayout={() => toggleLayout('register')}/>,
        'register': <Register toggleLayout={() => toggleLayout('login')}/>
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {componentMap[activeComponent]}
        </div>
    );
}

export default Auth;