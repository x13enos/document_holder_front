import { useState, useEffect } from 'react';
import Datepicker from './Datepicker';
import { format } from 'date-fns';

function DocumentFilters({ boxes, fetchDocuments }) {
  const [form, setForm] = useState({ name: '', boxId: '', date: '' });
  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }
  
  function fetchDocumentsWithFilters() {
    const params = {
      ...form,
      date: form.date === '' ? '' : format(new Date(form.date), 'dd MMMM yyyy'),
      box_id: form.boxId,
    }
    fetchDocuments(params);
  }

  function cleanFilters() {
    setForm({ name: '', boxId: '', date: '' });
    fetchDocuments();
  }

  return (
    <div className="flex mx-8">
      <input
        id="name"
        value={form.name}
        onChange={onChange}
        type="text"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs" />
      <select 
        id="boxId"
        value={form.boxId}
        onChange={onChange}
        className="select select-bordered max-w-xs ml-4">
        <option disabled value="">Select Box</option>
        { boxes.map(b => 
          <option key={b.id} value={b.id}>{b.name}</option>
        ) }
      </select>
      <Datepicker date={form.date} setDate={(value) => setForm({ ...form, date: value })} />
      <button className="btn ml-4" onClick={fetchDocumentsWithFilters}>Search</button>
      <button className="btn ml-4 btn-outline" onClick={cleanFilters}>Clear</button>
    </div>
  )
}

export default DocumentFilters