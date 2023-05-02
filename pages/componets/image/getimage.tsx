import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

interface WavesBackgroundProps {
    children: React.ReactNode;
}
const WavesBackground: React.FC<WavesBackgroundProps> = ({ children }) => {
    const vantaRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (vantaRef.current) {
            const effect = WAVES({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x750e32,
                zoom:0.8
            });
            return () => {
                effect.destroy();
            };
        }
    }, [vantaRef]);

    return (
        <div className='h-[30rem] flex justify-center w-[100%]' ref={vantaRef}>
            {children}
        </div>
    );
};

export default WavesBackground;