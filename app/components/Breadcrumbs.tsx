import { Link } from "@/i18n/routing";
import {FC} from 'react';
import { MdChevronRight } from "react-icons/md";    

interface Props {
    crumbs: {
        text: string;
        link?: string;
    }[];
}

const Breadcrumbs: FC<Props> = ({ crumbs }) => {
    return (
        <nav className='mb-4 md:mb-6 lg:mb-8'>
            <ul className={`flex flex-wrap items-center gap-1.5 text-foreground-600`}>
                <li className={`flex items-center gap-1.5`}>
                    <Link href={`/`} className='text-sm lg:text-xs'>
                        Home
                    </Link>
                    <MdChevronRight />
                </li>
                {
                    crumbs.map((crumb, i) => {
                        const { text, link } = crumb;

                        return (
                            <div key={i}>
                                {
                                    (i < crumbs.length - 1) ? (
                                        <li className={`flex items-center gap-1.5`}>
                                            <Link href={link || '#'} className='text-sm lg:text-xs'>
                                                {text}
                                            </Link>
                                            <MdChevronRight />
                                        </li>
                                    ) : (
                                        <li className='text-sm lg:text-xs'>
                                            {text}
                                        </li>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Breadcrumbs