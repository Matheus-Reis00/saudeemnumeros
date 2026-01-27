'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import AdsenseBanner from '../ads/AdsenseBanner';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResultCard = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color}10;
  border-left: 4px solid ${({ $color }) => $color};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ResultValue = styled.h4`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ResultLabel = styled.p`
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CTA = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.secondary}10;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
`;

export default function IMCCalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState<{ value: number; label: string; color: string } | null>(null);

    const calculateIMC = () => {
        const w = parseFloat(weight.replace(',', '.'));
        const h = parseFloat(height.replace(',', '.'));

        if (w > 0 && h > 0) {
            const imc = w / (h * h);
            let label = '';
            let color = '#10B981';

            if (imc < 18.5) {
                label = 'Abaixo do peso';
                color = '#F59E0B';
            } else if (imc < 24.9) {
                label = 'Peso normal';
                color = '#10B981';
            } else if (imc < 29.9) {
                label = 'Sobrepeso';
                color = '#F59E0B';
            } else {
                label = 'Obesidade';
                color = '#EF4444';
            }

            setResult({ value: parseFloat(imc.toFixed(2)), label, color });
        }
    };

    return (
        <Card>
            <Form>
                <FormGroup>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                        id="weight"
                        type="text"
                        placeholder="Ex: 75"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="height">Altura (m)</Label>
                    <Input
                        id="height"
                        type="text"
                        placeholder="Ex: 1.75"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </FormGroup>
                <Button onClick={calculateIMC} fullWidth>Calcular IMC</Button>
            </Form>

            {result && (
                <>
                    <ResultCard $color={result.color}>
                        <p>Seu IMC é:</p>
                        <ResultValue>{result.value}</ResultValue>
                        <ResultLabel style={{ color: result.color }}>{result.label}</ResultLabel>
                    </ResultCard>

                    <AdsenseBanner label="Recomendação para você" height="150px" />

                    <CTA>
                        <h5 style={{ marginBottom: '8px' }}>Quer um plano personalizado?</h5>
                        <p style={{ fontSize: '0.875rem' }}>Baixe nosso guia completo de emagrecimento saudável.</p>
                        <Button variant="secondary" size="sm" style={{ marginTop: '8px' }}>Saber Mais</Button>
                    </CTA>
                </>
            )}
        </Card>
    );
}
