import React, { useEffect } from 'react';
import './Snowflake.css';

const Snowflakes = () => {
    useEffect(() => {
        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            snowflake.style.animationDelay = `-${Math.random()}s`;
            document.querySelector('.snowflakes').appendChild(snowflake);
            snowflake.addEventListener('animationiteration', () => {
                document.querySelector('.snowflakes').removeChild(snowflake);
                createSnowflake();
            });
        };

        const toggleSnow = () => {
            const snowToggle = document.getElementById('snowToggle');
            let isSnowing = snowToggle.checked;
            if (isSnowing) {
                for (let i = 0; i < 50; i++) {
                    createSnowflake();
                }
            } else {
                document.querySelector('.snowflakes').innerHTML = '';
            }
        };

        const snowToggle = document.createElement('input');
        snowToggle.type = 'checkbox';
        snowToggle.id = 'snowToggle';
        snowToggle.checked = true; // เริ่มต้นให้หิมะตกอัตโนมัติ
        snowToggle.addEventListener('change', toggleSnow);

        const snowToggleContainer = document.createElement('div');
        snowToggleContainer.appendChild(snowToggle);
        snowToggleContainer.appendChild(document.createTextNode('เปิด/ปิด หิมะ'));
        document.body.appendChild(snowToggleContainer);

        for (let i = 0; i < 50; i++) {
            createSnowflake();
        }

        return () => {
            snowToggle.removeEventListener('change', toggleSnow);
            document.body.removeChild(snowToggleContainer);
        };
    }, []);

    return <div className="snowflakes"></div>;
};

export default Snowflakes;
