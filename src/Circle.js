import React, { useRef, useEffect } from "react";

function Circle(props) {
  const canvasRef = useRef(null);
  const centerX = 200;
  const centerY = 200;
  const radius = 185;
  let angleDiff = (2 * Math.PI * props.odd) / 100.0;
  let startAngle = 0;
  let endAngle = angleDiff;
  const sensitive = 1;

  function drawCircle(ctx) {
    clearCanvas(ctx);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 11;
    ctx.strokeStyle = "#3d9d43";
    ctx.stroke();
  }

  function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  useEffect(() => {
    angleDiff = (2 * Math.PI * props.odd) / 100.0;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let isDragging = false;

    function handleMouseDown(event) {
      isDragging = true;
    }

    function handleMouseMove(event) {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX * sensitive - rect.left;
        const mouseY = event.clientY * sensitive - rect.top;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const angle = Math.atan2(dy, dx);
        startAngle = angle - angleDiff / 2;
        endAngle = angle + angleDiff / 2;
        drawCircle(ctx);
      }
    }

    function handleMouseUp(event) {
      isDragging = false;
    }

    drawCircle(ctx);

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [props.odd]);

  return (
    <canvas
      className="z-50 cursor-grab absolute "
      ref={canvasRef}
      width="400"
      height="400"
    />
  );
}

export default Circle;
