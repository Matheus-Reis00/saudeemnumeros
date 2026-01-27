'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

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
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: white;
`;

const Result = styled.div`
  background-color: ${({ theme }) => theme.colors.primary}10;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const WeightRange = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function PesoIdealCalculator() {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculateIdealWeight = () => {
        const h = parseFloat(height);
        if (h > 152.4) {
            const baseWeight = gender === 'male' ? 50 : 45.5;
            const ideal = baseWeight + 2.3 * ((h - 152.4) / 2.54);
            setResult(Math.round(ideal));
        } else if (h > 0) {
            // Valor fixo simplificado para alturas menores que a base da fórmula
            setResult(gender === 'male' ? 50 : 45.5);
        }
    };

    return (
        <Card>
            <Form>
                <FormGroup>
                    <Label>Sexo</Label>
                    <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Altura (cm)</Label>
                    <Input type="number" placeholder="Ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
                </FormGroup>
                <Button onClick={calculateIdealWeight} fullWidth>Ver Peso Ideal</Button>
            </Form>

            {result && (
                <Result>
                    <p>Seu peso ideal estimado é:</p>
                    <WeightRange>{result - 2}kg - {result + 2}kg</WeightRange>
                    <p style={{ marginTop: '16px', fontSize: '0.875rem', color: '#666' }}>
                        Esta estimativa usa a fórmula de Devine. Consulte um profissional para uma avaliação completa.
                    </p>
                    <Button variant="secondary" style={{ marginTop: '24px' }}>Receber Plano Alimentar</Button>
                </Result>
            )}
        </Card>
    );
}
