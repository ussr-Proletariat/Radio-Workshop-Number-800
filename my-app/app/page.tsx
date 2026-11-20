"use client";
import { useRef } from "react";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <main>
    <h2>Приветствую тебя товарищь радиолюбитель в радио мастерской номер 800</h2>
    <p>Сайт полностью анонимный. Для работы сним нужно будет зарегистрироваться но там попросят тебя товарищь толко придумать ник и пароль</p><br />

    <img src="/инжинер2.gif" alt="инжинер" /><br />
    
    <button onClick={() => dialogRef.current?.showModal()}>
      Зарегистрироваться
    </button>

<dialog ref={dialogRef}>

  <button onClick={() => dialogRef.current?.close()}>
    Я передумал(а) регистрироваться</button>
    <h1>Регистрация</h1>
    <form>
      <label htmlFor="nik">Ник: (Мин.4, Макс.20)</label>
      <input id="nik" minLength={4} maxLength={20} size={20} type="text" required /><br />
    
      <label htmlFor="porol">Пароль:(Мин.4, Макс.8)</label>
      <input id="porol" minLength={4} maxLength={8} size={20} type="password" required /><br />
 {/*     <button onClick={() => router.push ("/verstak")}>Зарегистрироваться</button>*/}
    </form>
  
    <img src="/инжинер.gif" alt="инжинер" /><br />
</dialog>







  




      </main>
    </div>
  );
}
