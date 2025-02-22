/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Autocomplete, AutocompleteItem} from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IUser } from '@/types/users';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
  } from "@heroui/modal";


interface ItemProps {
    id: number;
    users: IUser[] | undefined;
    setUserCount: React.Dispatch<React.SetStateAction<number[]>>;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Ad boş ola bilməz"),
  });





export default function Item(props: ItemProps) {
    const {id, users, setUserCount} = props;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const formik = useFormik({
        initialValues: {
        name: "",
        note: ""
        },
        validationSchema,
        onSubmit: (values) => {
        console.log("Form məlumatları:", values);
        formik.values.name ? onOpen() : null
        }
    });

    
    return (
        <>
            <tr>
                <td className='pt-5'>{id}</td>

                <td className='pt-5'>
                <Autocomplete className="max-w-xs"
                name='name'
                onInputChange={ (value) => formik.handleChange({ target: { name: "name", value } })}
                placeholder='İşçi seçin'
                aria-label="İşçi seçimi">
                {users ? users.map((user,index) => (
                <AutocompleteItem key={index}>{`${user.id} - ${user.name}`}</AutocompleteItem>
                )): null}
                </Autocomplete>
                </td>

                <td className='pt-5'>
                <Input className='w-full'
                placeholder='xüsusi qeyd' 
                name="note"
                onChange={formik.handleChange}
                aria-label="Xüsusi qeyd"/>
                </td>

                <td>
                    <form onSubmit={formik.handleSubmit} className='pt-5 flex justify-center gap-2'>
                        <Button className='px-10 py-3 mx-2' 
                        onPress={() => formik.handleSubmit()}
                        color="primary" 
                        type='submit'
                        >Bax</Button>
                        
                        <Button className='px-10 py-3'
                        onPress={() => {setUserCount((prev) => prev.filter((item) => item !== id))}}
                        color="danger" 
                        aria-label="Sil">Sil</Button>
                    </form>
                    {formik.touched.name && formik.errors.name ? (
                       <span className="text-red-600 text-xs">işçi seçilməlidir</span> ) : null}
                </td>
            </tr>



            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex font-bold flex-col gap-1">İşçi Məlumatı</ModalHeader>
                    <ModalBody>
                        <div className="flex gap-2">
                            <div className='w-full'>
                                <h3 className='font-bold'>İşçi Nömrəsi:</h3>
                                <p className='w-full'>{formik.values.name.slice(0,5)}</p>
                            </div>
                            <div className='w-full'>
                                <h3 className='font-bold'>Adı Soyadı:</h3>
                                <p className='w-full'>{formik.values.name.slice(7)}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className='w-full'>
                                <h3 className='font-bold'>Əmrin əsas səbəbi:</h3>
                                <p className='w-full'>
                                    {formik.values.name.slice(7)}
                                    {formik.values.name.slice(4,5)==="1" ? 
                                    ' Ərizəsi' : formik.values.name.slice(4,5)==="2" ? 
                                    ' Təqdimatı' : formik.values.name.slice(4,5)==="3" ? 
                                    ' Razılıq Ərizəsi' : ''}
                                </p>
                            </div>
                            <div className='w-full'>
                                <h3 className='font-bold'>Qeyd:</h3>
                                <p className='w-full max-w-50 text-wrap'>{formik.values.note}</p>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}