import React, { Fragment } from 'react';

type TagsDropdownProps = {
  tag: string;
  getTag: (e: React.FormEvent<HTMLSelectElement>) => void;
};

const TagsDropdown: React.FC<TagsDropdownProps> = ({ tag, getTag }) => {
  return (
    <Fragment>
      <div className='flex flex-col gap-2 text-sm'>
        <label htmlFor='currency'>Tag:</label>
        <select
          value={tag}
          onChange={(e) => getTag(e)}
          className='input hover:cursor-pointer flex w-full '
        >
          <option className='block w-full' value='housing'>
            Housing
          </option>
          <option className='block w-full' value='transportation'>
            Transportation
          </option>
          <option className='block full' value='food'>
            Food
          </option>
          <option className='block w-full' value='utilities'>
            Utilities
          </option>
          <option className='block w-full' value='clothing'>
            Clothing
          </option>
          <option className='block w-full' value='medical'>
            Medical
          </option>
          <option className='block w-full' value='insurance'>
            Insurance
          </option>
          <option className='block w-full' value='supplies'>
            Supplies
          </option>
          <option className='block w-full' value='personal'>
            Personal
          </option>
          <option className='block w-full' value='debt'>
            Debt
          </option>
          <option className='block w-full' value='education'>
            Education
          </option>
          <option className='block w-full' value='entertainment'>
            Entertainment
          </option>
          <option className='block w-full' value='miscellanious'>
            Miscellanious
          </option>
        </select>
      </div>
    </Fragment>
  );
};

export default TagsDropdown;
