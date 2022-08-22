import ReactDatePicker from 'react-datepicker'
import { forwardRef, useEffect, useState } from 'react'
import { TbArrowNarrowLeft, TbArrowNarrowRight } from 'react-icons/tb'
import { format } from 'date-fns'

export default function Datepicker({ date, setDate }) {
  return (
    <div className="relative col-span-6">
      <ReactDatePicker
        selected={date || ""}
        onChange={(date) => setDate(date)}
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
        popperClassName="react-datepicker-left"
        customInput={<ButtonInput />}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-lg text-gray-700">
              {format(date, 'MMMM yyyy')}
            </span>

            <div className="space-x-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={`
                  ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                  inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                `}
              >
                <TbArrowNarrowLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`
                  ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                  inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                `}
              >
                <TbArrowNarrowRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  )
}

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <button
        onClick={onClick}
        ref={ref}
        type="button"
        className='input input-bordered w-full max-w-xs text-base'
    >
        {value ? format(new Date(value), 'dd MMMM yyyy') : 'Date of creating'}
    </button>
))