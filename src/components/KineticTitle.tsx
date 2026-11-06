import React from 'react';
import { motion } from 'framer-motion';

interface KineticTitleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  delay?: number;
  id?: string;
}

export const KineticTitle: React.FC<KineticTitleProps> = ({
  text,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  id
}) => {
  // Split sentence into individual words for staggered kinetic reveals
  const words = text.split(' ');

  return (
    <Tag id={id} className={`${className} flex flex-wrap justify-center items-center gap-x-[0.28em] gap-y-0.5`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden pb-1 -mb-1">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + idx * 0.04
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

interface KineticLinesProps {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
  align?: 'left' | 'center' | 'right';
  id?: string;
}

export const KineticLines: React.FC<KineticLinesProps> = ({
  lines,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  align = 'center',
  id
}) => {
  const alignClass =
    align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';

  return (
    <Tag id={id} className={`${className} flex flex-col ${alignClass}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="inline-block overflow-hidden pb-1 -mb-1">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + idx * 0.12
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
