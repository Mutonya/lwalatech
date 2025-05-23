import React from 'react';
import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    MenuItem,
    Box,
    Typography,
    Alert,
} from '@mui/material';
import { useCommodities, useCreateRequest } from '../hooks/useCommodities';
import { useCHWs } from '../hooks/useCHWs';

interface Commodity {
    id: number;
    name: string;
}

interface CHW {
    id: string;
    name: string;
}

interface RequestFormData {
    chwId: string;
    commodityId: number;
    quantity: number;
}

const RequestForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<RequestFormData>({
        defaultValues: {
            chwId: '',
            commodityId: 0,
            quantity: 1,
        },
    });

    const { data: commodities, isLoading: isLoadingCommodities } = useCommodities();
    const { data: chws, isLoading: isLoadingCHWs } = useCHWs();
    const { mutate, isLoading: isSubmitting, isError, error, isSuccess } = useCreateRequest();

    const selectedCommodityId = watch('commodityId');
    const selectedChwId = watch('chwId');

    const onSubmit = (data: RequestFormData) => {
        mutate({
            chwId: data.chwId.trim(),
            commodityId: data.commodityId,
            quantity: data.quantity
        }, {
            onSuccess: () => reset()
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                New Commodity Request
            </Typography>

            {isError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error instanceof Error ? error.message : 'An error occurred'}
                </Alert>
            )}

            {isSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Request submitted successfully!
                </Alert>
            )}

            <TextField
                select
                fullWidth
                label="Community Health Worker"
                margin="normal"
                {...register('chwId', { required: 'Please select a CHW' })}
                error={!!errors.chwId}
                helperText={errors.chwId?.message}
                disabled={isLoadingCHWs}
                value={selectedChwId}
            >
                <MenuItem value="" disabled>
                    {isLoadingCHWs ? 'Loading CHWs...' : 'Select CHW'}
                </MenuItem>
                {chws?.map((chw: CHW) => (
                    <MenuItem key={chw.id} value={chw.id}>
                        {chw.name} ({chw.id})
                    </MenuItem>
                ))}
            </TextField>

            {/* Rest of your form remains the same */}
            <TextField
                select
                fullWidth
                label="Commodity"
                margin="normal"
                {...register('commodityId', {
                    required: 'Commodity is required',
                    validate: value => value !== 0 || 'Please select a commodity'
                })}
                error={!!errors.commodityId}
                helperText={errors.commodityId?.message}
                disabled={isLoadingCommodities}
                value={selectedCommodityId}
            >
                <MenuItem value={0} disabled>
                    {isLoadingCommodities ? 'Loading commodities...' : 'Select a commodity'}
                </MenuItem>
                {commodities?.map((commodity: Commodity) => (
                    <MenuItem key={commodity.id} value={commodity.id}>
                        {commodity.name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                label="Quantity"
                type="number"
                margin="normal"
                {...register('quantity', {
                    required: 'Quantity is required',
                    min: { value: 1, message: 'Minimum quantity is 1' },
                    max: { value: 100, message: 'Maximum quantity is 100' },
                    valueAsNumber: true,
                })}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                inputProps={{ min: 1, max: 100 }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !selectedChwId || selectedCommodityId === 0}
                sx={{ mt: 2 }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
        </Box>
    );
};

export default RequestForm;