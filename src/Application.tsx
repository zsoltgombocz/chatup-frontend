import React from 'react';
import HomeView from './views/HomeView';
import { Routes, Route } from "react-router-dom";

const Application = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
        </Routes>
    );
};

export default Application;
