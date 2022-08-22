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
    <div className="grid grid-cols-12 gap-4 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-max mt-2 lg:mt-4">
      <input
        id="name"
        value={form.name}
        onChange={onChange}
        type="text"
        placeholder="Name"
        className="input input-bordered col-span-12" />
      <select 
        id="boxId"
        value={form.boxId}
        onChange={onChange}
        className="select select-bordered col-span-6">
        <option disabled value="">Select Box</option>
        { boxes.map(b => 
          <option key={b.id} value={b.id}>{b.name}</option>
        ) }
      </select>
      <Datepicker date={form.date} setDate={(value) => setForm({ ...form, date: value })} />
      <button className="btn col-span-6" onClick={fetchDocumentsWithFilters}>Search</button>
      <button className="btn btn-outline col-span-6" onClick={cleanFilters}>Clear</button>
    </div>
  )
}

export default DocumentFilters