'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AuthorAvatar from '@/components/ui/AuthorAvatar';
import { Author } from '@/lib/authors';

const Card = styled.div`
  background-color: white;
  border-radius: 24px;
  padding: 40px;
  border: 1px solid #e2e8f0;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #3B82F6;
  }
`;

const Name = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  margin-top: 24px;
  margin-bottom: 8px;
`;

const Role = styled.p`
  font-size: 1rem;
  color: #3B82F6;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Bio = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 32px;
  flex: 1;
`;

const Specialty = styled.div`
  padding: 8px 20px;
  background-color: #f1f5f9;
  border-radius: 30px;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 24px;
`;

export default function AuthorCard({ author }: { author: Author }) {
    return (
        <Link href={`/autores/${author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card>
                <AuthorAvatar name={author.name} image={author.image} size={140} />

                <Name style={{ marginTop: '24px', marginBottom: '8px' }}>{author.name}</Name>
                <Role>{author.role}</Role>

                <Bio>{author.bio}</Bio>

                <Specialty>Especialidade: {author.specialty}</Specialty>

                <Button variant="primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    Ver todos os artigos <ArrowRight size={18} />
                </Button>
            </Card>
        </Link>
    );
}
