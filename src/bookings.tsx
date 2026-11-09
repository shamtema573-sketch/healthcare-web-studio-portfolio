import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, X } from 'lucide-react';

type AureliaLocale = 'ru' | 'en' | 'de' | 'fr';
type BilingualLocale = 'ru' | 'en';
type CloseProps = { onClose: () => void };

const today = () => new Date().toISOString().slice(0, 10);

const aureliaLabels: Record<AureliaLocale, {
  tag: string; title: string; intro: string; service: string; date: string; times: string[];
  confirm: string; done: string; note: string; close: string; services: string[];
}> = {
  ru: {
    tag: 'AURELIA / ВЫБОР ВРЕМЕНИ', title: 'Спокойно выберите следующий шаг.',
    intro: 'Короткий демонстрационный сценарий. Данные остаются в этом окне.', service: 'Что запланировать',
    date: 'Удобная дата', times: ['10:30', '12:00', '15:30', '17:00'], confirm: 'Подготовить демо-визит',
    done: 'Время отмечено в демо. Запись не создана.', note: 'Здесь нет оплаты и отправки контактов.', close: 'Закрыть',
    services: ['Первичная консультация', 'Уход за кожей', 'План домашнего ухода']
  },
  en: {
    tag: 'AURELIA / TIME SELECTION', title: 'Choose a next step, at your pace.',
    intro: 'A short interface demonstration. Your choices stay in this window.', service: 'What would you like to plan',
    date: 'A day that suits you', times: ['10:30', '12:00', '15:30', '17:00'], confirm: 'Prepare a demo visit',
    done: 'Time marked in the demo. No appointment was created.', note: 'No payment or contact details are involved.', close: 'Close',
    services: ['First consultation', 'Skin-care session', 'At-home care plan']
  },
  de: {
    tag: 'AURELIA / TERMINAUSWAHL', title: 'Wählen Sie den nächsten Schritt in Ruhe.',
    intro: 'Eine kurze Demonstration. Ihre Auswahl bleibt in diesem Fenster.', service: 'Was möchten Sie planen',
    date: 'Ein passender Tag', times: ['10:30', '12:00', '15:30', '17:00'], confirm: 'Demobesuch vorbereiten',
    done: 'Zeit in der Demo markiert. Es wurde kein Termin gebucht.', note: 'Keine Zahlung und keine Kontaktdaten.', close: 'Schließen',
    services: ['Erstgespräch', 'Hautpflege', 'Pflegeplan für zu Hause']
  },
  fr: {
    tag: 'AURELIA / CHOIX DU CRÉNEAU', title: 'Choisissez la suite à votre rythme.',
    intro: 'Une courte démonstration. Vos choix restent dans cette fenêtre.', service: 'Que souhaitez-vous prévoir',
    date: 'Un jour qui vous convient', times: ['10:30', '12:00', '15:30', '17:00'], confirm: 'Préparer la visite démo',
    done: 'Horaire noté dans la démo. Aucun rendez-vous créé.', note: 'Aucun paiement ni coordonnée demandé.', close: 'Fermer',
    services: ['Première consultation', 'Soin de la peau', 'Routine à domicile']
  }
};

export function AureliaBooking({ locale, onClose }: { locale: AureliaLocale } & CloseProps) {
  const copy = aureliaLabels[locale];
  const [service, setService] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);
  return <div className="booking-shade aurelia-booking-shade" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}>
    <section className="aurelia-booking-panel" role="dialog" aria-modal="true" aria-labelledby="aurelia-booking-title">
      <button className="aurelia-booking-close" type="button" onClick={onClose} aria-label={copy.close}><X/></button>
      <aside className="aurelia-booking-image"><img src="/assets/images/r09-1-aurelia-consultation-v2.jpg" alt="A fictional consultation between a skin-care professional and an adult client"/><span>{copy.tag}</span></aside>
      <div className="aurelia-booking-content">
        <p className="eyebrow">{copy.tag}</p><h2 id="aurelia-booking-title">{done ? (locale === 'ru' ? 'Готово.' : locale === 'de' ? 'Erledigt.' : locale === 'fr' ? 'C’est prêt.' : 'All set.') : copy.title}</h2>
        {done ? <div className="aurelia-booking-success" role="status"><Check/><p>{copy.done}</p><small>{copy.note}</small><button className="button button-dark" type="button" onClick={onClose}>{copy.close}<ArrowRight/></button></div> : <>
          <p className="aurelia-booking-intro">{copy.intro}</p>
          <fieldset className="aurelia-service-choices"><legend>{copy.service}</legend>{copy.services.map((item, index) => <button key={item} type="button" aria-pressed={service === index} onClick={() => setService(index)}><span>0{index + 1}</span>{item}</button>)}</fieldset>
          <div className="aurelia-date-time"><label>{copy.date}<input aria-label={copy.date} type="date" value={date} min={today()} onChange={event => setDate(event.target.value)}/></label><div><span>{locale === 'ru' ? 'Время' : locale === 'de' ? 'Uhrzeit' : locale === 'fr' ? 'Heure' : 'Time'}</span><div className="aurelia-time-choices" role="group" aria-label={locale === 'ru' ? 'Время' : 'Time'}>{copy.times.map(slot => <button key={slot} type="button" aria-pressed={time === slot} onClick={() => setTime(slot)}>{slot}</button>)}</div></div></div>
          <footer className="aurelia-booking-footer"><small>{copy.note}</small><button className="button button-dark" type="button" disabled={!date || !time} onClick={() => setDone(true)}>{copy.confirm}<ArrowRight/></button></footer>
        </>}
      </div>
    </section>
  </div>;
}

const formaLabels = {
  ru: {
    step: ['ВИЗИТ', 'СПЕЦИАЛИСТ', 'ВРЕМЯ'], title: 'Соберите удобный визит.', intro: 'Показываем возможные шаги — без передачи заявки.', visit: 'Тип визита', people: 'Демо-профиль', day: 'Дата', time: 'Выберите интервал', confirm: 'Подготовить план визита', done: 'План визита готов к просмотру', note: 'Это демонстрация: запись и специалисты вымышлены.', close: 'Закрыть', services: ['Первичный осмотр', 'Профилактический уход', 'Консультация по восстановлению'], clinicians: ['Алекс Риверс', 'Мира Коваль', 'Итан Вейл'], times: ['09:00', '11:30', '14:00', '16:30']
  },
  en: {
    step: ['VISIT', 'PRACTITIONER', 'TIME'], title: 'Build a visit that fits.', intro: 'A preview of the steps, without submitting a request.', visit: 'Visit type', people: 'Fictional profile', day: 'Date', time: 'Choose a time', confirm: 'Prepare a visit plan', done: 'Visit plan is ready to review', note: 'Demonstration only: the booking and profiles are fictional.', close: 'Close', services: ['First examination', 'Preventive care', 'Restorative consultation'], clinicians: ['Alex Rivers', 'Mira Koval', 'Ethan Vale'], times: ['09:00', '11:30', '14:00', '16:30']
  }
} satisfies Record<BilingualLocale, { step: string[]; title: string; intro: string; visit: string; people: string; day: string; time: string; confirm: string; done: string; note: string; close: string; services: string[]; clinicians: string[]; times: string[] }>;

export function FormaBooking({ locale, onClose }: { locale: BilingualLocale } & CloseProps) {
  const copy = formaLabels[locale];
  const [service, setService] = useState(0);
  const [clinician, setClinician] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);
  return <div className="booking-shade forma-booking-shade" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}>
    <section className="forma-booking-board" role="dialog" aria-modal="true" aria-labelledby="forma-booking-title">
      <header className="forma-booking-top"><a href="#care" onClick={event => event.preventDefault()} className="forma-booking-mark">f.</a><div><span>{copy.step[0]} / {copy.step[1]} / {copy.step[2]}</span><p>{locale === 'ru' ? 'ЗАПИСЬ / КОНЦЕПТ 02' : 'VISIT PLANNER / CONCEPT 02'}</p></div><button type="button" onClick={onClose} aria-label={copy.close}><X/></button></header>
      <div className="forma-booking-columns">
        <div className="forma-booking-main">
          <h2 id="forma-booking-title">{done ? copy.done : copy.title}</h2><p>{copy.intro}</p>
          {!done && <>
            <fieldset className="forma-visit-types"><legend>01 / {copy.visit}</legend>{copy.services.map((item, index) => <button key={item} type="button" aria-pressed={service === index} onClick={() => setService(index)}><span>0{index + 1}</span><strong>{item}</strong><ChevronRight/></button>)}</fieldset>
            <fieldset className="forma-practitioner-types"><legend>02 / {copy.people}</legend>{copy.clinicians.map((person, index) => <button key={person} type="button" aria-pressed={clinician === index} onClick={() => setClinician(index)}><span className="forma-initials">{person.split(' ').map(part => part[0]).join('')}</span><span>{person}<small>{locale === 'ru' ? 'Демонстрационный профиль' : 'Fictional profile'}</small></span></button>)}</fieldset>
          </>}
          {done && <div className="forma-booking-confirmation" role="status"><span>✓</span><p>{copy.note}</p></div>}
        </div>
        <aside className="forma-booking-time">
          <span className="eyebrow">03 / {copy.time}</span><label>{copy.day}<input aria-label={copy.day} type="date" value={date} min={today()} onChange={event => setDate(event.target.value)}/></label>
          <div className="forma-booking-slots" role="group" aria-label={copy.time}>{copy.times.map(slot => <button key={slot} type="button" aria-pressed={time === slot} onClick={() => setTime(slot)}>{slot}</button>)}</div>
          <p>{copy.note}</p><button className="forma-booking-submit" type="button" disabled={!date || !time || done} onClick={() => setDone(true)}>{done ? (locale === 'ru' ? 'План готов' : 'Plan prepared') : copy.confirm}<ArrowRight/></button>
        </aside>
      </div>
    </section>
  </div>;
}

const clarityLabels = {
  ru: { eyebrow: 'CLARITY / ПЛАН ВИЗИТА', title: 'Сначала — маршрут.', intro: 'Демо-интерфейс не проверяет назначение и не отправляет данные.', route: 'Формат визита', atSite: 'В пункте забора', scheduled: 'По предварительному времени', date: 'Дата', slot: 'Интервал', tests: 'В плане исследований', prepare: 'Собрать демо-план', done: 'Маршрут собран', note: 'Требования к подготовке уточняют у лаборатории по конкретному исследованию.', close: 'Закрыть', slots: ['08:30', '10:00', '12:30'] },
  en: { eyebrow: 'CLARITY / VISIT PLAN', title: 'Start with the route.', intro: 'This demo does not check a medical order or send information.', route: 'Visit format', atSite: 'At a collection site', scheduled: 'With a sample time', date: 'Date', slot: 'Time window', tests: 'Tests in your plan', prepare: 'Build a sample plan', done: 'Route assembled', note: 'Preparation details must be confirmed with a laboratory for the specific test.', close: 'Close', slots: ['08:30', '10:00', '12:30'] }
} satisfies Record<BilingualLocale, { eyebrow: string; title: string; intro: string; route: string; atSite: string; scheduled: string; date: string; slot: string; tests: string; prepare: string; done: string; note: string; close: string; slots: string[] }>;

export function ClarityBooking({ locale, pickedCount, onClose }: { locale: BilingualLocale; pickedCount: number } & CloseProps) {
  const copy = clarityLabels[locale];
  const [route, setRoute] = useState('site');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [done, setDone] = useState(false);
  return <div className="booking-shade clarity-booking-shade" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}>
    <section className="clarity-booking-ticket" role="dialog" aria-modal="true" aria-labelledby="clarity-booking-title">
      <aside className="clarity-ticket-index"><button type="button" onClick={onClose} aria-label={copy.close}><X/></button><span>04 / ROUTE</span><h2>CLARITY<br/>INDEX</h2><p>{copy.tests} <strong>{pickedCount}</strong></p><div className="clarity-ticket-status">{done ? 'PLAN READY' : 'DEMO ONLY'}</div></aside>
      <div className="clarity-ticket-main"><p className="eyebrow">{copy.eyebrow}</p><h2 id="clarity-booking-title">{done ? copy.done : copy.title}</h2><p>{copy.intro}</p>
        {!done ? <>
          <fieldset className="clarity-route-choices"><legend>01 / {copy.route}</legend><button type="button" aria-pressed={route === 'site'} onClick={() => setRoute('site')}><span className="route-dot"/><span>{copy.atSite}<small>{locale === 'ru' ? 'Пример направления' : 'Sample destination'}</small></span><Check/></button><button type="button" aria-pressed={route === 'time'} onClick={() => setRoute('time')}><span className="route-dot"/><span>{copy.scheduled}<small>{locale === 'ru' ? 'Только для интерфейсного демо' : 'Interface demonstration only'}</small></span><Check/></button></fieldset>
          <div className="clarity-ticket-datetime"><label>{copy.date}<input aria-label={copy.date} type="date" value={date} min={today()} onChange={event => setDate(event.target.value)}/></label><div><span>{copy.slot}</span><div role="group" aria-label={copy.slot}>{copy.slots.map(item => <button key={item} type="button" aria-pressed={slot === item} onClick={() => setSlot(item)}>{item}</button>)}</div></div></div>
          <p className="clarity-ticket-note">{copy.note}</p><button className="clarity-ticket-submit" type="button" disabled={!date || !slot} onClick={() => setDone(true)}>{copy.prepare}<ArrowRight/></button>
        </> : <div className="clarity-ticket-success" role="status"><Check/><p>{copy.note}</p><button type="button" onClick={onClose}>{copy.close}<ArrowRight/></button></div>}
      </div>
    </section>
  </div>;
}

const moveLabels = {
  en: { marker: 'MOVEWELL / SESSION PLANNER', title: 'Plan a first conversation.', intro: 'A few choices. No forms about your health, and nothing is submitted.', session: '01 / Session', format: '02 / Format', time: '03 / Time', date: 'Choose a day', sessions: ['First conversation', 'Movement session', 'Recovery planning'], formats: ['In the studio', 'Video conversation'], slots: ['09:30', '11:00', '14:30', '16:00'], build: 'Preview my plan', done: 'Your demo plan is ready.', note: 'No appointment is reserved. Nothing is sent or stored.', close: 'Close' },
  ru: { marker: 'MOVEWELL / ПЛАН ВСТРЕЧИ', title: 'Подготовьте первую встречу.', intro: 'Несколько простых выборов. Без вопросов о здоровье и отправки данных.', session: '01 / Формат сессии', format: '02 / Способ встречи', time: '03 / Время', date: 'Выберите дату', sessions: ['Первая беседа', 'Сессия движения', 'План восстановления'], formats: ['В студии', 'Видеовстреча'], slots: ['09:30', '11:00', '14:30', '16:00'], build: 'Посмотреть демо-план', done: 'Демо-план готов.', note: 'Встреча не резервируется. Данные не отправляются и не сохраняются.', close: 'Закрыть' }
} satisfies Record<BilingualLocale, { marker: string; title: string; intro: string; session: string; format: string; time: string; date: string; sessions: string[]; formats: string[]; slots: string[]; build: string; done: string; note: string; close: string }>;

export function MoveWellBooking({ locale, onClose }: { locale: BilingualLocale } & CloseProps) {
  const copy = moveLabels[locale];
  const [session, setSession] = useState(-1);
  const [format, setFormat] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);
  return <div className="booking-shade movewell-booking-shade" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}>
    <section className="movewell-planner" role="dialog" aria-modal="true" aria-labelledby="movewell-planner-title">
      <aside className="movewell-planner-photo"><img src="/assets/images/r09-1-movewell-session.jpg" alt="A fictional movement professional supporting an adult client during a balance exercise"/><span>{copy.marker}</span></aside>
      <div className="movewell-planner-main"><header><p className="eyebrow">{copy.marker}</p><button type="button" onClick={onClose} aria-label={copy.close}><X/></button></header><h2 id="movewell-planner-title">{done ? copy.done : copy.title}</h2><p className="movewell-planner-intro">{copy.intro}</p>
        {!done ? <>
          <fieldset className="move-session-options"><legend>{copy.session}</legend>{copy.sessions.map((item, index) => <button key={item} type="button" aria-pressed={session === index} onClick={() => setSession(index)}><span>0{index + 1}</span>{item}</button>)}</fieldset>
          <fieldset className="move-format-options"><legend>{copy.format}</legend>{copy.formats.map((item, index) => <button key={item} type="button" aria-pressed={format === index} onClick={() => setFormat(index)}>{item}</button>)}</fieldset>
          <div className="move-date-time"><label>{copy.date}<input aria-label={copy.date} type="date" value={date} min={today()} onChange={event => setDate(event.target.value)}/></label><div><span>{copy.time}</span><div role="group" aria-label={copy.time}>{copy.slots.map(item => <button key={item} type="button" aria-pressed={time === item} onClick={() => setTime(item)}>{item}</button>)}</div></div></div>
          <button className="move-planner-submit" type="button" disabled={session < 0 || !date || !time} onClick={() => setDone(true)}>{copy.build}<ArrowRight/></button>
        </> : <div className="move-planner-success" role="status"><Check/><p>{copy.note}</p><button type="button" onClick={onClose}>{copy.close}<ArrowRight/></button></div>}
      </div>
    </section>
  </div>;
}
