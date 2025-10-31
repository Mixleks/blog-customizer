import { createRoot } from 'react-dom/client';
import React, { StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type CSSVars = React.CSSProperties & {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

const App = () => {
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);

	const style: CSSVars = {
		'--font-family': params.fontFamilyOption.value,
		'--font-size': params.fontSizeOption.value,
		'--font-color': params.fontColor.value,
		'--container-width': params.contentWidth.value,
		'--bg-color': params.backgroundColor.value,
	};

	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm
				initialValues={params}
				onChange={setParams} // <-- сюда передаем setParams вместо throw
				defaultOpen
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
