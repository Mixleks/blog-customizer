import { useEffect, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator/Separator';

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
	const [open, setOpen] = useState(defaultOpen);
	const [values, setValues] = useState<ArticleStateType>(initialValues);
	useEffect(() => setValues(initialValues), [initialValues]);

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
			<ArrowButton isOpen={open} onClick={() => setOpen(!open)} />

			<aside
				className={`${styles.container} ${open ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={submit} onReset={reset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					{/* Шрифт */}
					<fieldset className={styles.fieldset}>
						<legend className={styles.legend}>Шрифт</legend>
						<Select
							title=''
							options={fontFamilyOptions}
							selected={values.fontFamilyOption}
							onChange={(o) =>
								setValues((v) => ({ ...v, fontFamilyOption: o }))
							}
							placeholder='Выберите шрифт'
						/>
					</fieldset>

					{/*радиогруппа */}
					<fieldset className={styles.fieldset}>
						<legend className={styles.legend}>Размер шрифта</legend>
						<RadioGroup
							name='font-size'
							title=''
							options={fontSizeOptions}
							selected={values.fontSizeOption}
							onChange={(o) => setValues((v) => ({ ...v, fontSizeOption: o }))}
						/>
					</fieldset>

					{/* Цвет шрифта */}
					<fieldset className={styles.fieldset}>
						<legend className={styles.legend}>Цвет шрифта</legend>
						<Select
							title=''
							options={fontColors}
							selected={values.fontColor}
							onChange={(o) => setValues((v) => ({ ...v, fontColor: o }))}
							placeholder='Выберите цвет'
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<Separator></Separator>
					</fieldset>
					{/* Цвет фона */}
					<fieldset className={styles.fieldset}>
						<legend className={styles.legend}>Цвет фона</legend>
						<Select
							title=''
							options={backgroundColors}
							selected={values.backgroundColor}
							onChange={(o) => setValues((v) => ({ ...v, backgroundColor: o }))}
							placeholder='Выберите цвет'
						/>
					</fieldset>

					{/* Ширина контента*/}
					<fieldset className={styles.fieldset}>
						<legend className={styles.legend}>Ширина контента</legend>
						<Select
							title=''
							options={contentWidthArr}
							selected={values.contentWidth}
							onChange={(o) => setValues((v) => ({ ...v, contentWidth: o }))}
							placeholder='Выберите ширину'
						/>
					</fieldset>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
