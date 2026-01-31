import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 });
    const [cursorStyle, setCursorStyle] = useState({
        width: 30,
        height: 30,
        borderRadius: '50%',
        scaleX: 1,
        scaleY: 1,
        rotation: 0
    });
    const [hoveredElement, setHoveredElement] = useState(null);

    // Store target position and velocity in refs for smooth animation
    const targetPosition = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const currentPositionRef = useRef({ x: 0, y: 0 });

    // Calculate cursor deformation based on velocity
    const calculateDeformation = useCallback((vx, vy) => {
        const speed = Math.sqrt(vx * vx + vy * vy);
        const maxStretch = 1.5;
        const stretchFactor = Math.min(speed / 15, maxStretch - 1);

        // Calculate rotation angle based on movement direction
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);

        // Stretch in direction of movement, compress perpendicular
        const scaleX = 1 + stretchFactor * 0.5;
        const scaleY = 1 - stretchFactor * 0.25;

        return { scaleX, scaleY, rotation: angle };
    }, []);

    // Wrap cursor around element
    const wrapAroundElement = useCallback((element) => {
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const padding = 6;

        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
            borderRadius: window.getComputedStyle(element).borderRadius || '8px'
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            targetPosition.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Handle hover on interactive elements
        const handleElementHover = (e) => {
            setHoveredElement(e.currentTarget);
        };

        const handleElementLeave = () => {
            setHoveredElement(null);
        };

        // Spring physics animation for jelly effect
        const stiffness = 0.08;
        const damping = 0.8;

        const animate = () => {
            let targetX, targetY;

            if (hoveredElement) {
                // When hovering, move cursor to element center
                const wrapInfo = wrapAroundElement(hoveredElement);
                if (wrapInfo) {
                    targetX = wrapInfo.x;
                    targetY = wrapInfo.y;

                    // Smoothly transition cursor size to wrap element
                    setCursorStyle(prev => ({
                        width: prev.width + (wrapInfo.width - prev.width) * 0.15,
                        height: prev.height + (wrapInfo.height - prev.height) * 0.15,
                        borderRadius: wrapInfo.borderRadius,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0
                    }));
                } else {
                    targetX = targetPosition.current.x;
                    targetY = targetPosition.current.y;
                }
            } else {
                targetX = targetPosition.current.x;
                targetY = targetPosition.current.y;

                // Reset to default size when not hovering
                setCursorStyle(prev => {
                    const deform = calculateDeformation(velocity.current.x, velocity.current.y);
                    return {
                        width: prev.width + (30 - prev.width) * 0.15,
                        height: prev.height + (30 - prev.height) * 0.15,
                        borderRadius: '50%',
                        scaleX: deform.scaleX,
                        scaleY: deform.scaleY,
                        rotation: deform.rotation
                    };
                });
            }

            // Calculate spring force
            const dx = targetX - currentPositionRef.current.x;
            const dy = targetY - currentPositionRef.current.y;

            // Apply spring physics
            velocity.current.x += dx * stiffness;
            velocity.current.y += dy * stiffness;

            // Apply damping
            velocity.current.x *= damping;
            velocity.current.y *= damping;

            // Update position
            const newX = currentPositionRef.current.x + velocity.current.x;
            const newY = currentPositionRef.current.y + velocity.current.y;

            currentPositionRef.current = { x: newX, y: newY };
            setDisplayPosition({ x: newX, y: newY });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"], .btn-primary, .btn-secondary');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleElementHover);
            el.addEventListener('mouseleave', handleElementLeave);
        });

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);

            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleElementHover);
                el.removeEventListener('mouseleave', handleElementLeave);
            });
        };
    }, [hoveredElement, calculateDeformation, wrapAroundElement]);

    return (
        <div
            className="custom-cursor"
            style={{
                left: `${displayPosition.x}px`,
                top: `${displayPosition.y}px`,
                width: `${cursorStyle.width}px`,
                height: `${cursorStyle.height}px`,
                borderRadius: cursorStyle.borderRadius,
                opacity: isVisible ? 1 : 0,
                transform: `translate(-50%, -50%) rotate(${cursorStyle.rotation}deg) scaleX(${cursorStyle.scaleX}) scaleY(${cursorStyle.scaleY})`,
            }}
        />
    );
};

export default CustomCursor;
