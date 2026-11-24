"use client";
import { useEffect, useState } from "react";



type Pin = {
  id: string;
  offsetX: number;
  offsetY: number;
};

type Component = {
  id: number;
  type: string;
  x: number;
  y: number;
  pins: Pin[];
};
type Wire = { id: number; 
from: {componentId: number; pinId: string }; 
to: { componentId: number; pinId: string } };


export default function verstak() {
  const [components, setComponents] = useState<Component[]>([]);
  const [dragging, setDragging] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const [pendingConnection, setPendingConnection] = useState<{ componentId: number; pinId: string } | null>(null);
  const [wires, setWires] = useState<Wire[]>([]);


function getPins(type: string): Pin[] {
  if (type === "resistor") return [
    { id: "1", offsetX: 0, offsetY: 15 }, 
    { id: "2", offsetX: 60, offsetY: 15 },
  ];
  if (type === "tranzistor") return [
    { id: "base", offsetX: 0, offsetY: 15 },
    { id: "collector", offsetX: 60, offsetY: 5 },
    { id: "emitter", offsetX: 60, offsetY: 25 },
  ];

  if (type === "condensator") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "diod") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "swetodiod") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "voltmetor") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "pereklu") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "motorsh") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "katyshka") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "predox") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 15},
  ];

  if (type === "Poton") return [
    {id: "1", offsetX: 0, offsetY: 15 },
    {id: "2", offsetX: 60, offsetY: 5},
    {id: "3", offsetX: 60, offsetY: 25}
  ];

  return [];
}

 

  function addComponent(type: string) {
    setComponents([...components, { id: Date.now(), type, x: 100, y: 100, pins: getPins(type) }]);
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
   <button onClick={() => addComponent("motorsh")}>Моторчик</button><br/>
   <button onClick={() => addComponent("katyshka")}>Катушка</button><br/>
   <button onClick={() => addComponent("predox")}>Предохронитель</button><br/>
   <button onClick={() => addComponent("Poton")}>Потонцеометор</button><br/>
   <button onClick={() => addComponent("ne555")}>ne555</button><br/>



<svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
  {wires.map((w) => {
    const fromComp = components.find((c) => c.id === w.from.componentId);
    const toComp = components.find((c) => c.id === w.to.componentId);
    const fromPin = fromComp?.pins.find((p) => p.id === w.from.pinId);
    const toPin = toComp?.pins.find((p) => p.id === w.to.pinId);

    if (!fromComp || !toComp || !fromPin || !toPin) return null;

    return (
      <line
        key={w.id}
        x1={fromComp.x + fromPin.offsetX}
        y1={fromComp.y + fromPin.offsetY}
        x2={toComp.x + toPin.offsetX}
        y2={toComp.y + toPin.offsetY}
        stroke="black"
        strokeWidth={2}
      />
    );
  })}
</svg>

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

{c.pins.map((pin) => (
  <div
    key={pin.id}
    onMouseDown={(e) => {
    e.stopPropagation();
      if (!pendingConnection) {
    setPendingConnection({ componentId: c.id, pinId: pin.id });
  } else {
    setWires([...wires, { id: Date.now(), from: pendingConnection, to: { componentId: c.id, pinId: pin.id} }]);
    setPendingConnection(null);
  }




    }}
    style={{
      position: "absolute",
      left: pin.offsetX - 4,
      top: pin.offsetY - 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "red",
      cursor: "crosshair",
    }}
  />  
))}


   {c.type === "resistor" ? "R" : c.type === "condensator" ? "C" :
    c.type === "diod" ? "D" : c.type === "swetodiod" ? "SD" :
     c.type === "tranzistor" ? "T" : c.type === "voltmetor" ? "V" :
     c.type === "pereklu" ? "P" : c.type === "motorsh" ? "M" :
      c.type === "katyshka" ? "K" : c.type === "predox" ? "PR" :
      c.type === "Poton" ? "PO" : c.type}

          </div>
        ))}
     </div>
   );
}