

import { Box , Text,Flex} from '@chakra-ui/react';
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import {PulseLoader} from 'react-spinners';
import { PaginationAtom } from '@/recoil/paginationatom';
import {AnimatePresence, motion}  from 'framer-motion';

const Pagenation = () => {

    const [studentStateOn,setStudentState] = useRecoilState(studentState);
    const [pagination , setPagination] = useRecoilState(PaginationAtom);


    return(
        <Box  gap={1} borderRadius={4} display={'flex'} overflow={'hidden'} pt={{base:0,md:4}}>
            
        { pagination.loadingState ? <>
             <PulseLoader size={14} color={'orange'} />
            </> :  <> { !pagination?.loadingState && (<AnimatePresence>
                { pagination?.buttonsDisplayer.map((v,i)=> (<motion.div key={i} whileHover={{scale:1.07, transition: { duration: 0.3 }}}>
                    <Box px={3} 
                    onClick={()=>setPagination((prev)=>({...prev,currentPage:v,paginatedData:studentStateOn.students.slice((v-1)*5,(v-1)*5+(pagination.perPageList)),firstIndex:(v-1)*5,lastIndex:(v-1)*5}))} 
                    className={`${(pagination.currentPage===v) ? 'bg-green-400 text-white':' bg-slate-300'}`} 
                    cursor={'pointer'}>{v}</Box>
                </motion.div>))
                }
                  </AnimatePresence>)
                }
                </>
        }

        </Box>
    )
}

export default Pagenation;