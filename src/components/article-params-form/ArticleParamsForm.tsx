import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text/Text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType,
} from 'src/constants/articleProps';

type Props = {
	initialValues?: ArticleStateType;
	onChange: (v: ArticleStateType) => void;
	defaultOpen?: boolean;
};

export const ArticleParamsForm = ({
	initialValues = defaultArticleState,
	onChange,
	defaultOpen = false,
}: Props) => {
	const [open, setOpen] = useState(!defaultOpen);
	const [values, setValues] = useState<ArticleStateType>(initialValues);
	useEffect(() => setValues(initialValues), [initialValues]);

	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: open,
		rootRef,
		onClose: () => setOpen(false),
		onChange: setOpen,
	});

	const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onChange(values);
	};

	const reset: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setValues(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={() => setOpen((v) => !v)} />

			<div ref={rootRef}>
				<aside
					className={clsx(styles.container, open && styles.container_open)}
					aria-hidden={!open}>
					<form className={styles.form} onSubmit={submit} onReset={reset}>
						<div className={styles.titleWrap}>
							<Text as='h2' size={31} weight={800}>
								Задайте параметры
							</Text>
						</div>

						{/* Шрифт */}
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={values.fontFamilyOption}
							placeholder='Выберите шрифт'
							onChange={(o) =>
								setValues((v) => ({ ...v, fontFamilyOption: o }))
							}
						/>

						{/* Размер шрифта */}
						<RadioGroup
							name='font-size'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={values.fontSizeOption}
							onChange={(o) => setValues((v) => ({ ...v, fontSizeOption: o }))}
						/>

						{/* Цвет шрифта */}
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={values.fontColor}
							placeholder='Выберите цвет'
							onChange={(o) => setValues((v) => ({ ...v, fontColor: o }))}
						/>

						<Separator />

						{/* Цвет фона */}
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={values.backgroundColor}
							placeholder='Выберите цвет'
							onChange={(o) => setValues((v) => ({ ...v, backgroundColor: o }))}
						/>

						{/* Ширина контента */}
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={values.contentWidth}
							placeholder='Выберите ширину'
							onChange={(o) => setValues((v) => ({ ...v, contentWidth: o }))}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
