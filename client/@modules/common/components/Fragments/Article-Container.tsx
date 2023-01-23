import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ArticleContainerProps } from '@modules/common/types/types-interfaces';
import SquareContainer from './Square-Container';

const ArticleContainer: React.FC<ArticleContainerProps> = ({
  abstract,
  web_url,
  lead_paragraph,
  news_desk,
}) => {
  return (
    <SquareContainer>
      <span className='flex justify-between items-start border-b border-black'>
        <h3 className='font-extrabold text-base'>{abstract}</h3>
        <a
          href={web_url}
          className=' hover:opacity-75 font-bold text-sm underline underline-offset-4'
          target={'_blank'}
          rel={'noreferrer'}
        >
          <ArrowTopRightOnSquareIcon className='h-4 w-4 hover' />
        </a>
      </span>
      <p className='font-light text-sm'>{lead_paragraph}</p>
      <h3 className='font-bold text-xs underline underline-offset-4'>
        {news_desk}
      </h3>
    </SquareContainer>
  );
};

export default ArticleContainer;
