import React, { useState } from 'react'
import GeneratedFormCard from '../components/GeneratedForm/GeneratedFormCard';
import CustomButton from '../components/UI/CustomButton';
import StepperComponent, { StepperItemsProp } from '../components/UI/Stepper'
import { FormDefaultObjecType, useFormValidator } from '../utils/hooks/UseFormHook';
import { stepEnum, UseStepperHook } from '../utils/hooks/UseStepperHook';
import { Input } from 'antd';
import { validationCases } from '../utils/constant/regrexPattern.constant';
import SelectComponent from '../components/UI/SelectComponent';
import { CarColourOptions, CarMakeOptions } from '../utils/constant/selectOptions.constant';
import { pushToast } from '../utils/helpers/pushToast';

const submitDataDefault = { isSubmitted: false, res: { make: '', colour: '', code: '' }, error: '' }

const GeneratorForm = () => {

    const { alphaNumeric, maxLength, minLength } = validationCases
    const initialFormData: FormDefaultObjecType = {
        make: { value: '', required: true },
        colour: { value: '', required: true },
        code: { value: '', required: true, patterns: [maxLength(25), alphaNumeric, minLength(4)] },
    }
    const { formData, formErrors, validateForm, handleFieldChange, clearFormData } = useFormValidator(initialFormData);

    const [submitData, setSubmitData] = useState(submitDataDefault)

    const formItems: StepperItemsProp[] = [
        {
            content:
                <GeneratedFormCard
                    title='Select a Make'
                    component={<>
                        <SelectComponent
                            value={formData?.make}
                            options={CarMakeOptions}
                            onChange={(value: string) => {
                                handleFieldChange([{ field: 'make', value }])
                            }}
                        />
                        {formErrors?.make && <p className='text-red-400 animate-pulse'>{formErrors?.make}</p>}
                    </>}
                />
        },
        {
            content:
                <GeneratedFormCard
                    title='Select a Colour'
                    component={<>
                        <SelectComponent
                            value={formData?.colour}
                            options={CarColourOptions}
                            onChange={(value: string) => {
                                handleFieldChange([{ field: 'colour', value }])
                            }}
                        />
                        {formErrors?.colour && <p className='text-red-400 animate-pulse'>{formErrors?.colour}</p>}
                    </>}
                />
        },
        {
            content:
                <GeneratedFormCard
                    title='Enter Code'
                    component={
                        <>
                            <Input
                                value={formData?.code}
                                placeholder='Enter code...'
                                onChange={(e) => {
                                    const newValue = e.currentTarget.value
                                    handleFieldChange([{ field: 'code', value: newValue }])
                                }}
                            />
                            {formErrors?.code && <p className='text-red-400 animate-pulse'>{formErrors?.code}</p>}
                        </>
                    }
                />

        }
    ]

    const { current, moveStep } = UseStepperHook(formItems)

    const handleSubmit = () => {
        if (validateForm()) {
            try {
                const { colour, code, make } = formData
                const payload = { colour, code, make };
                //this dispatch is made to submit payload.. We mock it here for dummy.
                pushToast({ type: 'loading', content: "Generating Text..." })
                setTimeout(() => {
                    pushToast({ type: 'success', content: "Operation Successful!" })
                    setSubmitData({ isSubmitted: true, res: payload, error: '' })
                    clearFormData()
                }, 3000);
            } catch (error) {
                const message = (error as Error)?.message || "An Error Occurred!";
                pushToast({ type: 'error', content: message })
                setSubmitData({ ...submitData, isSubmitted: true, error: message })
            }
        }
    };

    const handleTabNavigation = (dir: stepEnum | number) => {
        if (dir === stepEnum.next) {
            if (current === 0 && !validateForm(['make'])) return;
            if (current === 1 && !validateForm(['colour'])) return;
            if (current === 2) return handleSubmit()
        } else {
            if (current === 0 && dir === stepEnum.prev) return;
        }
        moveStep(dir)
    }


    return (
        <div className='lg:p-10 md:p-6 p-2 min-h-screen space-y-6 '>
            <div className='md:p-6 p-2 bg-white shadow-lg'>
                {!submitData.isSubmitted ? <form className='w-full flex justify-start md:items-end items-center flex-col'>
                    <StepperComponent
                        current={current}
                        items={formItems}
                    />
                    <div className='w-full'>{formItems[current].content}</div>
                    <div className='flex justify-start space-x-4 p-8'>
                        <CustomButton
                            onClick={() => handleTabNavigation(stepEnum.prev)}
                            text='Back'
                            className='!bg-red-400'
                        />
                        <CustomButton
                            onClick={() => handleTabNavigation(stepEnum.next)}
                            text={`${current === 2 ? 'Submit' : 'Continue'}`}
                        />
                    </div>
                </form>
                    : <GeneratedFormCard
                        title='Generated Text'
                        component={<div className='space-y-16'>
                            {submitData.error ? <div>{submitData.error}</div> :
                                <div className='space-y-4'>
                                    <h1> I have a {submitData.res.make} and the colour is {submitData.res.colour}.</h1>
                                    {submitData.res.colour === 'RED' && <h1>THE CAR IS RED! NICE!! </h1>}
                                    <h1>REF: {submitData.res.code}</h1>
                                </div>
                            }
                            <CustomButton
                                onClick={() => {
                                    setSubmitData(submitDataDefault)
                                    moveStep(0)
                                }}
                                text='Submit New Form'
                            />
                        </div>}
                    />
                }
            </div>
        </div>
    )
}

export default GeneratorForm