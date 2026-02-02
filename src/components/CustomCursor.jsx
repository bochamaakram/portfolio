import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for all animation values to avoid re-renders
    const cursorState = useRef({
        x: 0,
        y: 0,
        width: 30,
        height: 30,
        borderRadius: '50%',
        scaleX: 1,
        scaleY: 1,
        rotation: 0
    });

    const targetState = useRef({
        x: 0,
        y: 0,
        width: 30,
        height: 30,
        borderRadius: '50%'
    });

    const velocity = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const hoveredElement = useRef(null);

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
            targetState.current.x = e.clientX;
            targetState.current.y = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleElementHover = (e) => {
            hoveredElement.current = e.currentTarget;
        };

        const handleElementLeave = () => {
            hoveredElement.current = null;
        };

        // Spring physics animation for jelly effect
        // Increased stiffness and decreased damping for snappier, smoother response
        const stiffness = 0.15;
        const damping = 0.75;
        const resizeSpeed = 0.2; // Smoother size transition

        const animate = () => {
            if (!cursorRef.current) return;

            let targetX, targetY, targetWidth, targetHeight, targetRadius;

            if (hoveredElement.current) {
                const wrapInfo = wrapAroundElement(hoveredElement.current);
                if (wrapInfo) {
                    targetX = wrapInfo.x;
                    targetY = wrapInfo.y;
                    targetWidth = wrapInfo.width;
                    targetHeight = wrapInfo.height;
                    targetRadius = wrapInfo.borderRadius;
                } else {
                    targetX = targetState.current.x;
                    targetY = targetState.current.y;
                    targetWidth = 30;
                    targetHeight = 30;
                    targetRadius = '50%';
                }
            } else {
                targetX = targetState.current.x;
                targetY = targetState.current.y;
                targetWidth = 30;
                targetHeight = 30;
                targetRadius = '50%';
            }

            // Smoothly interpolate size
            cursorState.current.width += (targetWidth - cursorState.current.width) * resizeSpeed;
            cursorState.current.height += (targetHeight - cursorState.current.height) * resizeSpeed;

            // For borderRadius, we can't interpolate easily if it's mixed units, so strictly swapping for now
            // or we can just stick to targetRadius if we assume transitions are removed
            cursorState.current.borderRadius = targetRadius;

            // Calculate spring force position
            const dx = targetX - cursorState.current.x;
            const dy = targetY - cursorState.current.y;

            velocity.current.x += dx * stiffness;
            velocity.current.y += dy * stiffness;

            velocity.current.x *= damping;
            velocity.current.y *= damping;

            cursorState.current.x += velocity.current.x;
            cursorState.current.y += velocity.current.y;

            // Calculate deformation only when strictly following mouse (not hovering element)
            let scaleX = 1, scaleY = 1, rotation = 0;
            if (!hoveredElement.current) {
                const deform = calculateDeformation(velocity.current.x, velocity.current.y);
                scaleX = deform.scaleX;
                scaleY = deform.scaleY;
                rotation = deform.rotation;
            }

            // Apply styles directly to DOM
            const { x, y, width, height, borderRadius } = cursorState.current;
            cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
            cursorRef.current.style.width = `${width}px`;
            cursorRef.current.style.height = `${height}px`;
            cursorRef.current.style.borderRadius = borderRadius;
            cursorRef.current.style.opacity = isVisible ? 1 : 0;

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

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
    }, [calculateDeformation, wrapAroundElement, isVisible]);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
        />
    );
};

export default CustomCursor;
