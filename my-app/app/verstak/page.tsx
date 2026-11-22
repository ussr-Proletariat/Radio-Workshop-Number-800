"use client";
import { useEffect, useState } from "react";

type Component = { id: number; type: string; x: number; y: number };

export default function verstak() {
  const [components, setComponents] = useState<Component[]>([]);
  const [dragging, setDragging] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);


  function addComponent(type: string) {
    setComponents([...components, { id: Date.now(), type, x: 100, y: 100}]);
  }
useEffect(() => {
   if (!dragging) return;

   function handleMouseMove(e: MouseEvent) {
      setComponents((prev) =>
        prev.map((c) =>
          c.id === dragging?.id
            ? { ...c, x: e.clientX - dragging.offsetX, y: e.clientY - dragging.offsetY }
          : c
      )
    );
  }

  function handleMouseUp() {
    setDragging(null);
  }

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

}, [dragging]);
    return (



<div style={{ backgroundImage: "url('/Сетка.jpg')", backgroundSize: "cover", width: "100%", height: "100vh", position: "relative" }}>
   
   <h1>Рабочий стол</h1>

   <button onClick={() => addComponent("resistor")}>Резистор</button><br/>
   <button onClick={() => addComponent("condensator")}>Конденсатор</button><br/>
   <button onClick={() => addComponent("diod")}>Диод</button><br/>
   <button onClick={() => addComponent("swetodiod")}>Светодиод</button><br/>
   <button onClick={() => addComponent("tranzistor")}>Транзистор</button><br/>
   <button onClick={() => addComponent("voltmetor")}>Волтметор</button><br/>
      <button onClick={() => addComponent("pereklu")}>Переключатель</button><br/>

{components.map((c) => (
 <div
   key={c.id}
   style={{
    position: "absolute",
    left: c.x,
    top: c.y,
    width: 60,
    height: 30,
    background: "yellow",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   }}

onMouseDown={(e) => {
   setDragging({ id: c.id, offsetX: e.clientX - c.x, offsetY: e.clientY - c.y,});
}}

>
   {c.type === "resistor" ? "R" : c.type === "condensator" ? "C" :
    c.type === "diod" ? "D" : c.type === "swetodiod" ? "SD" :
     c.type === "tranzistor" ? "T" : c.type === "voltmetor" ? "V" :
     c.type === "pereklu" ? "P" : c.type}

          </div>
        ))}
     </div>
   );
}